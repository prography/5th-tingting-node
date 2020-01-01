import Team from './entities/Team.entity'
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class TeamModel {
  // 전체 팀 리스트 찾기(User is not owner)
  async findTeamListIsNotOwner (userId) {
    const teams = await Team.findAll({
      attributes: ['id'],
      where: {
        owner_id: { [Op.ne]: userId },
        is_verified: 0,
        is_deleted: 0
      }
    })
    const teamList = teams.map(team => team.dataValues.id)
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
    const teams = await Team.findAll({
      attributes: ['id'],
      where: {
        owner_id: userId,
        is_deleted: 0
      }
    })
    const teamList = teams.map(team => team.dataValues.id)
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
  async checkIsGathered (id) {
    const gathered = await Team.findOne({
      attributes: ['is_verified'],
      where: {
        id,
        is_verified: 1,
        is_deleted: 0
      }
    })
    // const isGather = JSON.stringify(gathered)
    const isGathered = (gathered.length !== 0)
    return isGathered
  }

  async checkIsOnwer (data) {
    const owner = await Team.findOne({
      attributes: ['owner_id'],
      where: {
        id: data.teamId,
        owner_id: data.userId,
        is_deleted: 0
      }
    })
    const isOwner = (owner.length !== 0)
    return isOwner
  }

  async deleteTeam (id) {
    await Team.update({
      is_deleted: 1
    },
    { where: { id } })
  }

  async updateTeamIsVerified (data) {
    await Team.update({
      is_verified: data.is_verified
    },
    { where: { id: data.teamId } })
  }

  // 팀 합류하기
  async findTeamMaxMemberNum (id) {
    const maxMember = await Team.findOne({
      attributes: ['max_member_number'],
      where: {
        id,
        is_deleted: 0,
        is_verified: 0
      }
    })
    return maxMember.dataValues.max_member_number
  }

  async findTeamGender (id) {
    const genderOfTeam = await Team.findOne({
      attributes: ['gender'],
      where: {
        id,
        is_deleted: 0
      }
    })
    return genderOfTeam.dataValues.gender
  }
}
module.exports = TeamModel
