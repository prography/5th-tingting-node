import Team from './entities/Team.entity'

class ModelTeam {
  // 전체 팀 리스트 보기

  // 팀 생성
  async saveTeam (data) {
    await Team.create({
      name: data.name,
      chat_address: data.chat_address,
      owner_id: data.owner_id,
      intro: data.intro,
      gender: data.gender,
      password: data.password,
      max_member_number: data.max_member_number
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
  async updateUserTeam (data) {
    await Team.update({
      name: data.name,
      chat_address: data.chat_address,
      owner_id: data.owner_id,
      intro: data.intro,
      password: data.password,
      max_member_number: data.max_member_number
    },
    { where: { id: data.id } })
  }

  // 팀 떠나기

  // 팀 합류하기
}
module.exports = ModelTeam
