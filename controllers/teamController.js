const TeamService = require('../services/TeamService')

// 전체 팀 리스트
const getTeamList = async (req, res) => {
  const teamService = new TeamService()
  const teamList = await teamService.findAllTeamListWithoutMe(1) // token
  res.status(200).json({
    data: teamList
  })
  // res 401: Unauthorized
}

// 팀 생성  -> name 중복 체크 추가
const createTeam = async (req, res, next) => {
  const teamService = new TeamService()
  const {
    body: {
      name,
      chat_address,
      owner_id,
      intro,
      gender,
      password,
      max_member_number
    }
  } = req
  try {
    await teamService.saveTeam({
      name,
      chat_address,
      owner_id,
      intro,
      gender,
      password,
      max_member_number
    })

    res.status(201).json({
      data: {
        // 생성된 팀 정보(name) name으로 id 찾아서 정보 반환 --> 기능 찾아서 추가
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '팀 생성 실패' })
  }
}
// 개별 팀 정보 보기
const getTeamInfo = async (req, res) => {
  const teamService = new TeamService()
  try {
    const teamInfo = await teamService.findTeamInfo(req.params.id)
    const teamMember = await teamService.findTeamMemberList(req.params.id)
    res.status(200).json({
      data: {
        teamInfo,
        teamMember
        // 매칭 정보
      }
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({ errorMessage: '팀 정보 없음' })
  }
}

module.exports = {
  getTeamList,
  createTeam,
  getTeamInfo
}
