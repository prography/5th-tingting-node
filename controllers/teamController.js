const SerTeam = require('../services/serTeam')
// 전체 팀 리스트
const getTeamList = async (req, res) => {
  const serTeam = new SerTeam()
  const teamList = await serTeam.findAllTeamListWithoutMe(1)// token
  res.status(200).json({
    data: teamList
  })
  // res 401: Unauthorized
}

// 팀 생성  -> name 중복 체크 추가
const createTeam = async (req, res, next) => {
  const serTeam = new SerTeam()
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
    await serTeam.saveTeam({
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
        // 생성된 팀 정보(name) name으로 id 찾아서 정보 반환
      }
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({ errorMessage: '팀 생성 실패' })
  }
}
// 개별 팀 정보 보기
const getTeamInfo = async (req, res) => {
  const serTeam = new SerTeam()
  try {
    const teamInfo = await serTeam.findTeamInfo(req.params.id)
    const teamMember = await serTeam.findTeamMemberList(req.params.id)
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
