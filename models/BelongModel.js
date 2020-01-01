import Belong from './entities/Belong.entity'
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class BelongModel {
  // 전체 팀 리스트 찾기(user is not belong)
  // async findTeamListIsNotBelong(userId) {
  //   const teamsNotBelong = await Belong.findAll({
  //     attributes: ['team_id'],
  //     where: {
  //       user_id: { [Op.ne]: userId }
  //     }
  //   })
  //   const teamList = teamsNotBelong.map(team => team.dataValues.team_id)
  //   return teamList
  // }

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

  // 나의 개별 팀 리스트 찾기
  async findMyTeamList (user_id) {
    const teams = await Belong.findAll({
      attributes: ['team_id'],
      where: {
        user_id
      }
    })
    const teamList = teams.map(belong => belong.dataValues.team_id)
    return teamList
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

  async createBelongByUserIdAndTeamId (data) {
    await Belong.create({
      team_id: data.teamId,
      user_id: data.userId
    })
  }
}

module.exports = BelongModel
