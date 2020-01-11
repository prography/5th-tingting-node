const MeService = require('../services/MeService')
const TeamService = require('../services/TeamService')
const MatchingService = require('../services/MatchingService')
const AuthService = require('../services/AuthService')

const getMyInfo = async (req, res) => {
  const myService = new MeService()
  const authService = new AuthService()
  try {
    const myInfo = await myService.findMyInfo(req.token.id)
    const address = myInfo.authenticated_address
    const school = await authService.findSchoolByEmail(address)
    const schoolName = school.name
    myInfo.schoolName = schoolName
    delete myInfo.authenticated_address
    const myTeamList = await myService.findMyTeamList(req.token.id)
    res.status(200).json({
      data: {
        myInfo,
        myTeamList
        // 학교 이름 제공
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '내정보 불러오기 실패' })
  }
}

const updateMyInfo = async (req, res) => {
  const myService = new MeService()
  const id = 1 // req.token.id
  const { name, birth, height, thumbnail } = req.body
  try {
    // 토큰 검사 넣기
    await myService.updateMyInfo({
      id,
      name,
      birth,
      height,
      thumbnail
    })
    const updateMyInfo = await myService.findMyInfo(id)
    const updatemyTeamList = await myService.findMyTeamList(id)
    res.status(202).json({
      data: {
        updateMyInfo,
        updatemyTeamList
        // 학교 이름 제공
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '내 정보 수정하기 실패' })
  }
}
const getMyTeamInfo = async (req, res) => {
  const myService = new MeService()
  const teamService = new TeamService()
  try {
    const userTeamList = await myService.findMyTeamList(req.token.id) // req.token.id
    if (userTeamList.length !== 0) {
      req.params.id = parseInt(req.params.id)
      let isUsersTeam = false
      for (let team of userTeamList) {
        if (team.id === req.params.id) {
          isUsersTeam = true
          break
        }
      }
      if (isUsersTeam) {
        const teamInfo = await teamService.findTeamInfo(req.params.id)
        const teamMember = await teamService.findAllTeamMembersInfo(
          req.params.id
        )
        res.status(200).json({
          data: {
            teamInfo,
            teamMember
            // 매칭 정보
          }
        })
      } else {
        res.status(403).json({ errorMessage: '팀에 속해있지 않음' })
      }
    } else {
      res.status(404).json({ errorMessage: '팀 정보 없음' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '팀 불러오기 실패' })
  }
}

// 팀 수정
const updateMyTeam = async (req, res) => {
  const myService = new MeService()
  const id = parseInt(req.params.id) // team id
  const {
    body: { name, chat_address, owner_id, intro, password, max_member_number }
  } = req
  try {
    const userTeamList = await myService.findMyTeamList(2) // req.token.id
    let isUsersTeam = false
    for (let team of userTeamList) {
      if (team.id === req.params.id) {
        isUsersTeam = true
        break
      }
    }
    if (isUsersTeam) {
      await myService.updateMyTeam({
        id,
        name,
        chat_address,
        owner_id,
        intro,
        password,
        max_member_number
      })
      res.status(201).json({
        data: {
          // 수정 팀 data
        }
      })
    } else {
      res
        .status(403)
        .json({ errorMessage: '수정하고자 하는 팀에 속해있지 않음' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '팀 수정 실패' })
  }
}

// 수정 : 삭제 시 deleted_at update
const leaveMyTeam = async (req, res) => {
  const myService = new MeService()
  const teamService = new TeamService()
  const matchingService = new MatchingService()

  const teamId = parseInt(req.params.id)
  const userId = req.token.id

  const isGathered = await teamService.checkIsGathered(teamId)
  const isMatched = await matchingService.checkIsMatched(teamId)
  const isOwner = await myService.checkIsOwner({ userId, teamId })
  try {
    const userTeamList = await myService.findMyTeamList(userId)
    console.log(userTeamList)
    let isUsersTeam = false
    for (let team of userTeamList) {
      if (team.id === teamId) {
        isUsersTeam = true
        break
      }
    }
    if (isUsersTeam) {
      // 방 팀원이 다 안찬 팀
      if (!isGathered) {
        if (isOwner) {
          await myService.deleteMyTeam(teamId)
          res
            .status(204)
            .json({ data: { message: '팀장 권한으로 팀 제거 완료(팀 채널)' } })
        } else {
          await myService.removeMeFromTeam({ userId, teamId })
          res
            .status(204)
            .json({ data: { message: '팀원 나가기 완료(팀 채널)' } })
        }
      } else if (!isMatched) {
        // 찼지만 매칭이 안된 팀
        // 관련 데이터 matching, accept, apply 지우기
        await matchingService.deleteMatchingdata(teamId) // deleted 1
        if (isOwner) {
          await myService.deleteMyTeam(teamId) // team deleted 1 belong destroy
          res.status(204).json({
            data: { message: '팀장 권한으로 팀 제거 완료(매칭 채널)' }
          })
        } else {
          await myService.removeMeFromTeam({ userId, teamId })
          res
            .status(204)
            .json({ data: { message: '팀원 나가기 완료(매칭 채널)' } })
        }
      } else {
        res.status(400).json({ errorMessage: '이미 매칭 된 팀, 나가기 불가' })
      }
    } else {
      res.status(403).json({ errorMessage: '나가고자 하는 팀에 속해있지 않음' })
    }
  } catch (error) {
    console.log(error)
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
