const TeamService = require('../services/TeamService')
const UserService = require('../services/UserService')
const MeService = require('../services/MeService')

// 전체 팀 리스트
const getTeamList = async (req, res) => {
  try {
    // 팀ID 리스트 생성
    const userId = req.token.id
    const teamService = new TeamService()
    const teamList = await teamService.findAllTeamListWithoutMe(userId)
    if (teamList.length === 0) {
      res.status(404).json({ errorMessage: '팀이 존재하지 않습니다.' })
    } else {
      res.status(200).json({
        data: { teamList }
      })
    }
  } catch (error) {
    res.status(500).json({ errorMessage: '팀 리스트 불러오기 실패' })
  }
}

// 팀 생성
const createTeam = async (req, res) => {
  const teamService = new TeamService()
  const userId = req.token.id
  const {
    body: { name, chat_address, intro, password, max_member_number }
  } = req
  try {
    await teamService.saveTeam({
      name,
      chat_address,
      owner_id: userId,
      intro,
      password,
      max_member_number
    })
    res.status(201).json({
      data: {
        message: '팀 생성 성공'
      }
    }) // 생성된 팀 정보(name) name으로 id 찾아서 정보 반환 --> 기능 찾아서 추가
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '팀 생성 실패' })
  }
}

// 팀명 중복 확인
const checkDuplicateTeamName = async (req, res) => {
  const teamService = new TeamService()
  const {
    query: { name }
  } = req
  const isDuplicated = await teamService.checkIsDuplicatedTeamName(name)
  if (isDuplicated) {
    res.status(400).json({ errorMessage: '이미 존재하는 팀명입니다.' })
  } else {
    res.status(200).json({ data: { message: '사용 가능한 팀명입니다.' } })
  }
}

// 개별 팀 정보 보기
const getTeamInfo = async (req, res) => {
  const teamService = new TeamService()
  try {
    const teamId = req.params.id
    const teamInfo = await teamService.getTeamInfo(teamId)
    if (teamInfo === null) {
      res.status(404).json({ errorMessage: '팀이 존재하지 않습니다.' })
    } else {
      const teamMember = await teamService.getTeamMembersInfo(teamId)
      res.status(200).json({
        data: {
          teamInfo,
          teamMember
          // 매칭 정보
        }
      })
    }
  } catch (error) {
    res.status(500).json({ errorMessage: '해당 팀 정보 불러오기 실패' })
  }
}

const joinTeam = async (req, res) => {
  //수정 필요
  const teamService = new TeamService()
  const userService = new UserService()
  const teamId = parseInt(req.params.id)
  const userId = req.token.id
  const {
    body: { password }
  } = req
  try {
    const userGender = await userService.getUserGender(userId)
    const teamList = await teamService.findAllTeamListWithoutMe(
      userId,
      userGender
    )
    if (teamList.length !== 0) {
      // 유저가 합류 가능한 팀인지 확인 (Gender 같은 팀 / User가 현재 속하지 않은 팀 / 존재하는 팀)
      let isTeamPossibleToJoin = false
      teamList.some(team => {
        if (team.id === teamId) {
          isTeamPossibleToJoin = true
        }
      })
      if (isTeamPossibleToJoin) {
        const teamPassword = await teamService.getTeamPassword(teamId)
        if (teamPassword !== null) {
          // 비밀번호가 있는 경우
          if (teamPassword === password) {
            await teamService.joinTeamToBelong(teamId, userId)
            res.status(201).json({
              data: { message: '합류에 성공했습니다.' }
            })
          } else {
            res.status(403).json({
              errorMessage: '비밀번호가 틀렸습니다.'
            })
          }
        } else {
          // 비밀번호가 없는 경우
          await teamService.joinTeamToBelong(teamId, userId)
          res.status(201).json({
            data: { message: '합류에 성공했습니다.' }
          })
        }
      } else {
        res.status(403).json({
          errorMessage: '합류가 불가능한 팀입니다.'
        })
      }
    } else {
      res.status(403).json({
        errorMessage: '합류할 수 있는 팀이 존재하지 않습니다.'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '합류에 실패하였습니다.' })
  }
}

module.exports = {
  getTeamList,
  createTeam,
  checkDuplicateTeamName,
  getTeamInfo,
  joinTeam
}
