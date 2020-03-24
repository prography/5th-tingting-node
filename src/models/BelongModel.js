import Belong from './entities/Belong.entity'
import User from './entities/User.entity'
import Team from './entities/Team.entity'

User.belongsToMany(Team, { through: 'belongs' })
Team.belongsToMany(User, { through: 'belongs' })

class BelongModel {
  // 개별 팀 팀원 리스트
  async findTeamMemberIdListWhoBelongto (team_id) {
    const belongs = await Belong.findAll({
      attributes: ['user_id'],
      where: {
        team_id
      },
      raw: true
    })
    const teamMemberIdList = belongs.map(member => member.user_id)
    return teamMemberIdList
  }

  // 내가 팀원으로 속한 팀 찾기
  async findTeamsByUserId (userId) {
    const user = await User.findOne({
      where: {
        id: userId
      },
      include: [
        {
          model: Team,
          attributes: ['id', 'name', 'max_member_number',['is_verified','is_ready']]
        }
      ]
    })
    const teams = user.teams
    for (const idx in teams) {
      delete teams[idx].dataValues.belongs
      teams[idx] = teams[idx].dataValues
    }
    return teams
  }

  // 팀멤버 찾기
  async findUsersByTeamId (teamId) {
    const team = await Team.findOne({
      where: {
        id: teamId
      },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'thumbnail']
        }
      ]
    })
    const users = team.users
    for (const idx in users) {
      delete users[idx].dataValues.belongs
    }
    return users
  }

  async deleteBelongByTeamId (team_id) {
    await Belong.destroy({
      where: {
        team_id
      }
    })
  }

  async deleteBelongByUserIdAndTeamId (data) {
    await Belong.destroy({
      where: {
        team_id: data.teamId,
        user_id: data.userId
      }
    })
  }

  async createTeamMember (data) {
    await Belong.create({
      team_id: data.teamId,
      user_id: data.userId
    })
  }
}

module.exports = BelongModel
