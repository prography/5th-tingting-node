import Team from './entities/Team.entity'

class ModelTeam {
  // 전체 팀 리스트 보기

  // 팀 생성
  async createTeam (team_id, teamname, chat_address, gender, owner_id, team_member_number, intro, verified_at) {
    await Team.create({
      id: team_id,
      teamname: teamname,
      chat_address: chat_address,
      gender: gender,
      owner_id: owner_id,
      team_member_number: team_member_number,
      intro: intro,
      verified_at: verified_at
    })
  }

  // 인원에 따른 팀 리스트 찾기

  // 나의 개별 팀 리스트 찾기
  async findMyTeamList (userId) {
    const teamList = []
    await Team.findAll({
      attributes: ['id'],
      where: {
        owner_id: userId
      }
    }).then(teams => {
      teams.map(team => teamList.push(team.dataValues.id))
    })
    return teamList
  }

  // 나의 개별 팀 보기

  // 나의 팀 정보 수정

  // 팀 떠나기

  // 팀 합류하기
}
module.exports = ModelTeam
