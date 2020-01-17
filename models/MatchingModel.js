import Matching from './entities/Matching.entity'
import Team from './entities/Team.entity'
const Sequelize = require('sequelize')
const Op = Sequelize.Op

Matching.belongsTo(Team, { foreignKey: 'send_team_id', as: 'sendTeam' })
Matching.belongsTo(Team, { foreignKey: 'receive_team_id', as: 'receiveTeam' })

class MatchingModel {
  async checkIsMatched(teamId) {
    const accepts = await Matching.findAll({
      where: {
        receive_team_id: teamId,
        receive_accept_all: 1,
        is_deleted: 0
      }
    })
    const isMatched = accepts.length !== 0
    return isMatched
  }

  async checkIsHeartSent(myTeamId, teamId) {
    const matching = await Matching.findOne({
      where: {
        send_team_id: myTeamId,
        receive_team_id: teamId,
        is_deleted: 0
      },
      raw: true
    })
    const isHeartSent = matching !== null
    return isHeartSent
  }

  async findMatchedTeams() {
    const teams = await Matching.findAll({
      attributes: ['send_team_id', 'receive_team_id'],
      where: {
        is_deleted: 0,
        verified_at: { [Op.ne]: null }
      },
      raw: true
    })
    return teams
  }

  async findMatchingsIdsByTeamId(teamId) {
    const matchings = await Matching.findAll({
      where: {
        [Op.or]: [{ send_team_id: teamId }, { receive_team_id: teamId }],
        is_deleted: 0
      },
      raw: true
    })
    return matchings
  }

  async deleteMatchingByTeamId(teamId) {
    await Matching.update(
      {
        is_deleted: 1,
        deleted_at: new Date()
      },
      {
        where: {
          [Op.or]: [{ send_team_id: teamId }, { receive_team_id: teamId }]
        }
      }
    )
  }

  async findMatchingInfosByTeamId(teamId, userId) {
    const matchings = await Matching.findAll({
      attributes: ['id'],
      where: {
        send_team_id: teamId,
        send_accept_all: 0,
        is_deleted: 0
      },
      include: [
        {
          model: Team,
          as: 'sendTeam',
          attributes: ['id', 'name']
        },
        {
          model: Team,
          as: 'receiveTeam',
          attributes: ['id', 'name']
        }
      ]
    })
    return matchings
  }
}
module.exports = MatchingModel
