const MeService = require('../services/MeService')
const TeamService = require('../services/TeamService')
const MatchingService = require('../services/MatchingService')

const getMyInfo = async (req, res) => {
  const userId = req.token.id
  const myService = new MeService()
  try {
    const myInfo = await myService.getMyInfo(userId)
    const myTeamList = await myService.getMyTeamList(userId)
    res.status(200).json({
      data: {
        myInfo,
        myTeamList
      }
    })
  } catch (error) {
    res.status(500).json({ errorMessage: '내 정보 불러오기 실패' })
  }
}

const updateMyInfo = async (req, res) => {
  const myService = new MeService()
  const userId = req.token.id
  const { height, thumbnail } = req.body
  try {
    await myService.updateMyInfo({
      userId,
      height,
      thumbnail
    })
    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ errorMessage: '내 정보 수정하기 실패' })
  }
}

const getMyTeamInfo = async (req, res) => {
  const teamService = new TeamService()
  const myService = new MeService()
  try {
    const userId = req.token.id
    const teamId = parseInt(req.params.id)
    const teamInfo = await teamService.getTeamInfo(teamId)
    if (teamInfo !== null) {
      const myTeamList = await myService.getMyTeamList(userId)
      const myTeamIdList = myTeamList.map(team => team.id)
      const isMember = myTeamIdList.includes(teamId)
      if (isMember) {
<<<<<<< HEAD
        const teamMember = await teamService.getTeamMembersInfo(
          req.params.id,
          teamInfo.owner_id
        )
=======
        const teamMember = await teamService.getTeamMembersInfo(req.params.id)
        const teamMatching = await teamService.getTeamMatchingInfo(teamId)
>>>>>>> team Receive MatchingList
        res.status(200).json({
          data: {
            teamInfo,
            teamMember,
            teamMatching
          }
        })
      } else {
        res.status(403).json({ errorMessage: '팀에 속해있지 않음' })
      }
    } else {
      res.status(404).json({ errorMessage: '팀 정보 없음' })
    }
  } catch (error) {
    res.status(500).json({ errorMessage: '팀 불러오기 실패' })
  }
}

// 팀 수정
const updateMyTeam = async (req, res) => {
  const myService = new MeService()
  const teamId = parseInt(req.params.id)
  const userId = req.token.id
  const {
    body: { name, chat_address, intro, password, max_member_number }
  } = req
  try {
    const myTeamList = await myService.getMyTeamList(userId)
    const myTeamIdList = myTeamList.map(team => team.id)
    const isMember = myTeamIdList.includes(teamId)
    if (isMember) {
      await myService.updateMyTeam({
        teamId,
        name,
        chat_address,
        intro,
        password,
        max_member_number
      })
      res.status(201).json({
        data: {
          message: '내 팀 수정에 성공했습니다.'
        } // 수정 팀 data
      })
    } else {
      res
        .status(403)
        .json({ errorMessage: '수정하고자 하는 팀에 속해있지 않음' })
    }
  } catch (error) {
    res.status(500).json({ errorMessage: '팀 수정 실패' })
  }
}

const leaveMyTeam = async (req, res) => {
  const myService = new MeService()
  const teamService = new TeamService()
  const matchingService = new MatchingService()

  try {
    const teamId = parseInt(req.params.id)
    const userId = req.token.id

    const isGathered = await teamService.checkIsGathered(teamId)
    const isMatched = await matchingService.checkIsMatched(teamId)
    const isOwner = await myService.checkIsOwner({ userId, teamId })
    const myTeamList = await myService.getMyTeamList(userId)
    const myTeamIdList = myTeamList.map(team => team.id)
    const isMember = myTeamIdList.includes(teamId)
    if (isMember) {
      if (!isGathered) {
        // 방 팀원이 다 안찬 팀
        if (isOwner) {
          await myService.deleteMyTeam(teamId)
          res
            .status(200)
            .json({ data: { message: '팀장 권한으로 팀 제거 완료(팀 채널)' } })
        } else {
          await myService.removeMeFromTeam({ userId, teamId })
          res
            .status(200)
            .json({ data: { message: '팀원 나가기 완료(팀 채널)' } })
        }
      } else if (!isMatched) {
        // 찼지만 매칭이 안된 팀
        // 관련 데이터 matching, accept, apply 지우기
        await matchingService.deleteMatchingdata(teamId) // deleted 1
        if (isOwner) {
          await myService.deleteMyTeam(teamId) // team deleted 1 belong destroy
          res.status(200).json({
            data: { message: '팀장 권한으로 팀 제거 완료(매칭 채널)' }
          })
        } else {
          await myService.removeMeFromTeam({ userId, teamId })
          res
            .status(200)
            .json({ data: { message: '팀원 나가기 완료(매칭 채널)' } })
        }
      } else {
        res.status(400).json({ errorMessage: '이미 매칭 된 팀, 나가기 불가' })
      }
    } else {
      res.status(403).json({ errorMessage: '나가고자 하는 팀에 속해있지 않음' })
    }
  } catch (error) {
    res.status(500).json({ errorMessage: '팀 삭제 오류' })
  }
}

module.exports = {
  getMyInfo,
  updateMyInfo,
  updateMyTeam,
  getMyTeamInfo,
  leaveMyTeam
}
