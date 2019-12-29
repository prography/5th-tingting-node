import Belong from './entities/Belong.entity'
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class BelongModel {
  // 전체 팀 리스트 찾기(user is not belong)
  async findTeamListIsNotBelong (userId) {
    const teamList = []
    await Belong.findAll({
      attributes: ['team_id'],
      where: {
        user_id: { [Op.ne]: userId }
      }
    }).then(belongs => {
      belongs.map(belong => teamList.push(belong.dataValues.team_id))
    })
    return teamList
  }

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
  async findMyTeamList (userId) {
    const teamList = []
    await Belong.findAll({
      attributes: ['team_id'],
      where: {
        user_id: userId
      }
    }).then(belongs => {
      belongs.map(belong => teamList.push(belong.dataValues.team_id))
    })
    return teamList
  }
}

module.exports = BelongModel
