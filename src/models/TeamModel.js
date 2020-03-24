import Team from './entities/Team.entity'
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class TeamModel {
  // 전체 팀 리스트 찾기(User is not owner)
  async findTeamsWithNoneOwner (userId, gender) {
    const teams = await Team.findAll({
      attributes: ['id', 'owner_id', 'name', 'place', 'max_member_number'],
      where: {
        owner_id: { [Op.ne]: userId },
        gender,
        is_verified: 0,
        is_deleted: 0
      },
      raw: true
    })
    return teams
  }

  // 아직 매칭되지 않은 이성 팀 리스트 찾기
  async findVerifiedTeamsWithOppositeGender (gender) {
    const teams = await Team.findAll({
      attributes: ['id', 'owner_id', 'name', 'place', 'max_member_number'],
      where: {
        gender: !gender,
        is_verified: 1,
        is_deleted: 0
      },
      raw: true
    })
    return teams
  }

  // 팀 생성
  async saveTeam (data) {
    await Team.create({
      name: data.name,
      chat_address: data.chat_address,
      owner_id: data.owner_id,
      intro: data.intro,
      gender: data.gender,
      place: data.place,
      password: data.password, // 수정 필요
      max_member_number: data.max_member_number
    })
  }

  // 팀 이름 존재하는지 찾기
  async findTeamByName (name) {
    const team = await Team.findOne({
      where: {
        name,
        is_deleted: 0
      },
      attributes: ['name'],
      raw: true
    })
    return team
  }

  // 개별 팀 정보 보기
  async findTeamInfo (id) {
    const teamInfo = await Team.findOne({
      attributes: [
        'id',
        'name',
        'owner_id',
        'intro',
        'gender',
        'place',
        'password',
        'chat_address',
        'max_member_number'
      ],
      where: {
        id,
        is_deleted: 0
      },
      raw: true
    })
    return teamInfo
  }

  // 해당 유저가 주인으로 있는 팀 목록 찾기
  async findTeamsOwnedByUserId (userId) {
    const teams = await Team.findAll({
      attributes: ['id', 'name', 'max_member_number', ['is_verified','is_ready']],
      where: {
        owner_id: userId,
        is_deleted: 0
      },
      raw: true
    })
    return teams
  }

  // 나의 팀 정보 수정
  async updateTeam (data) {
    await Team.update(
      {
        name: data.name,
        chat_address: data.chat_address,
        intro: data.intro,
        place: data.place,
        password: data.password,
        max_member_number: data.max_member_number
      },
      { where: { id: data.teamId } }
    )
  }

  // 팀 떠나기
  // is gatherd? = is_verified ?  1:0
  async checkIsGathered (id) {
    const gathered = await Team.findOne({
      where: {
        id,
        is_verified: 1,
        is_deleted: 0
      }
    })
    const isGathered = gathered !== null
    return isGathered
  }

  async checkIsOnwer (data) {
    const owner = await Team.findOne({
      where: {
        id: data.teamId,
        owner_id: data.userId,
        is_deleted: 0
      }
    })
    const isOwner = owner !== null
    return isOwner
  }

  async deleteTeam (id) {
    await Team.update(
      {
        is_deleted: 1,
        deleted_at: new Date()
      },
      { where: { id } }
    )
  }

  async updateTeamIsVerified (data) {
    await Team.update(
      {
        is_verified: data.is_verified
      },
      { where: { id: data.teamId } }
    )
  }

  async findTeamPassword (id) {
    const team = await Team.findOne({
      attributes: ['password'],
      where: {
        id
      },
      raw: true
    })
    return team.password
  }
}

module.exports = TeamModel
