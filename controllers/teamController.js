const TeamService = require('../services/TeamService')
const UserService = require('../services/UserService')
const MeService = require('../services/MeService')

// 전체 팀 리스트 조회 // 수정 : 성별 필터 추가
const getTeamList = async (req, res) => {
  try {
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
  const meService = new MeService()
  const {
    token: { id }
  } = req
  const {
    body: { name, chat_address, intro, password, max_member_number }
  } = req
  try {
    const gender = await meService.findMyGender(id)
    await teamService.saveTeam({
      name,
      chat_address,
      owner_id: id,
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
  const teamService = new TeamService()
  const userService = new UserService()
  const teamId = parseInt(req.params.id)
  const userId = 5 // req.token.id
  try {
    const teamList = await teamService.findAllTeamListWithoutMe(userId)
    if (teamList.length !== 0) {
      const isNotUsersTeam = teamList.includes(teamId)
      if (isNotUsersTeam) {
        const userGender = await userService.getUserGender(userId)
        const teamGender = await teamService.getTeamGender(teamId)
        if (userGender === teamGender) {
          await teamService.joinTeamToBelong({ teamId, userId })
          res.status(204).json({
            data: { message: '합류 성공' }
          })
        } else {
          res
            .status(403)
            .json({ errorMessage: '성별이 달라 합류할 수 없습니다.' })
        }
      } else {
        res.status(403).json({
          errorMessage:
            '합류하고자 하는 팀에 속해있거나, 팀이 존재하지 않습니다.'
        })
      }
    } else {
      res
        .status(404)
        .json({ errorMessage: '합류할 수 있는 팀이 존재하지 않습니다.' })
    }
    // 팀 id 존재 유무 따로 빼기 //team API 전체 적용
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '팀 합류 실패' })
  }
}

module.exports = {
  getTeamList,
  createTeam,
  checkDuplicateTeamName,
  getTeamInfo,
  joinTeam
}
