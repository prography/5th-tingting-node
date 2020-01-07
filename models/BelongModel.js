import Belong from './entities/Belong.entity'
import User from './entities/User.entity'
import Team from './entities/Team.entity'

User.belongsToMany(Team, { through: 'Belongs' })
Team.belongsToMany(User, { through: 'Belongs' })

class BelongModel {
  // 개별 팀 팀원 리스트
  async findTeamMemberWhoBelongto (team_id) {
    const belongs = await Belong.findAll({
      attributes: ['user_id'],
      where: {
        team_id
      }
    })
    const teamMemberList = belongs.map(member => member.dataValues.user_id)
    return teamMemberList
  }

  // 내가 팀원으로 속한 팀 찾기
  async findTeamsByUserId (userId) {
    const user = await User.findOne({
      where: {
        id: userId
      },
      include: [{
        model: Team,
        attributes: ['id', 'name']
      }]
    })
    const teams = user.teams
    console.log(teams)
    for (let idx in teams) {
      delete teams[idx].dataValues.Belongs
    }
    return teams
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
