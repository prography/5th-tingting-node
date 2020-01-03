import Matching from './entities/Matching.entity'
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class MatchingModel {
  // is matchig? = receive_accept_all? 1:0
  async checkIsMatched (teamId) {
    const accepts = await Matching.findAll({
      attributes: ['receive_accept_all'],
      where: {
        receive_team_id: teamId,
        receive_accept_all: 1,
        is_deleted: 0
      }
    })
    const isMatched = (accepts.length !== 0)
    return isMatched
  }

  async findMatchingIdsByTeamId (teamId) {
    const matchingIds = await Matching.findAll({
      attributes: ['id'],
      where: {
        [Op.or]: [{ send_team_id: teamId }, { receive_team_id: teamId }],
        is_deleted: 0
      }
    })
    const matchingIdList = matchingIds.map(matching => matching.dataValues.id)
    return matchingIdList
  }

  async deleteMatchingByTeamId (teamId) {
    await Matching.update({
      is_deleted: 1
    }, {
      where: { [Op.or]: [{ send_team_id: teamId }, { receive_team_id: teamId }] }
    })
  }
}
module.exports = MatchingModel
