import Team from './entities/Team.entity'
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class TeamModel {
  // 전체 팀 리스트 찾기(User is not owner)
  async findTeamListIsNotOwner (userId) {
    const teamList = []
    await Team.findAll({
      attributes: ['id'],
      where: {
        owner_id: { [Op.ne]: userId },
        is_verified: 0,
        is_deleted: 0
      }
    }).then(teams => {
      teams.map(team => teamList.push(team.dataValues.id))
    })
    return teamList
  }

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

  // 개별 팀 정보 보기
  async findUserTeamInfo (id) {
    const teamData = await Team.findOne({
      attributes: ['name', 'chat_address', 'owner_id', 'intro', 'gender', 'password', 'max_member_number', 'is_verified'],
      where: {
        id,
        is_deleted: 0
      }
    })
    return teamData
  }

  // 나의 개별 팀 리스트 찾기
  async findMyTeamList (userId) {
    const teamList = []
    await Team.findAll({
      attributes: ['id'],
      where: {
        owner_id: userId,
        is_deleted: 0
      }
    }).then(teams => {
      teams.map(team => teamList.push(team.dataValues.id))
    })
    return teamList
  }

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

  // is gatherd? = is_verified ?  1:0
  async isGathered (id) {
    const gathered = await Team.findOne({
      attributes: ['is_verified'],
      where: {
        id,
        is_deleted: 0
      }
    })
    const isGather = JSON.stringify(gathered)
    return isGather
  }

  async isOwner (data) {
    const owner = await Team.findOne({
      attributes: ['owner_id'],
      where: {
        id: data.teamId,
        owner_id: data.userId,
        is_deleted: 0
      }
    })
    const teamowner = JSON.stringify(owner)
    return teamowner
  }

  async deleteUserTeam (id) {
    await Team.update({
      is_deleted: 1
    },
    { where: { id } })
  }

  async updateTeamVerify (data) {
    await Team.update({
      is_verified: data.verify
    },
    { where: { id: data.teamId } })
  }

  // 팀 합류하기
}
module.exports = TeamModel
