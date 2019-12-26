const SerTeam = require('../services/serTeam')

// 팀 생성

// 팀 수정

// 인원에 따라 팀리스트 찾기
const createTeamList = async (req, res) => {
  const serTeam = new SerTeam()
  const teamList = await serTeam.findTeamList().then()
  console.log(teamList)
  res.send({ teamList })
}

module.exports = {
  createTeamList
}
