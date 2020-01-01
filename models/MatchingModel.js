import Matching from './entities/Matching.entity'
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class MatchingModel {
  // is matchig? = receive_accept_all? 1:0
  async isMatched (teamId) {
    const accepts = await Matching.findAll({
      attributes: ['receive_accept_all'],
      where: {
        receive_team_id: teamId
      }
    })
    const acceptList = accepts.map(x => x.dataValues.receive_accept_all)
    return acceptList
  }

  async findMatchingIdByTeam (teamId) {
    const matchingId = await Matching.findAll({
      attributes: ['id'],
      where: {
        [Op.or]: [{ send_team_id: teamId }, { receive_team_id: teamId }]
      }
    })
    const matchingIdList = matchingId.map(matching => matching.dataValues.id)
    return matchingIdList
  }

  async deleteMatchingTeam (teamId) {
    await Matching.update({
      is_deleted: 1
    }, {
      where: { [Op.or]: [{ send_team_id: teamId }, { receive_team_id: teamId }] }
    })
  }
}
module.exports = MatchingModel
