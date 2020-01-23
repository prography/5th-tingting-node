import Matching from './entities/Matching.entity'
import Team from './entities/Team.entity'
const Sequelize = require('sequelize')
const Op = Sequelize.Op

Matching.belongsTo(Team, { foreignKey: 'send_team_id', as: 'sendTeam' })
Matching.belongsTo(Team, { foreignKey: 'receive_team_id', as: 'receiveTeam' })

class MatchingModel {
  async checkIsMatched (teamId) {
    const accepts = await Matching.findAll({
      where: {
        [Op.or]: [{ send_team_id: teamId }, { receive_team_id: teamId }],
        receive_accept_all: 1,
        is_deleted: 0
      }
    })
    const isMatched = accepts.length !== 0
    return isMatched
  }

  async checkIsHeartSent (sendTeamId, receiveTeamId) {
    const matching = await Matching.findOne({
      where: {
        send_team_id: sendTeamId,
        receive_team_id: receiveTeamId,
        is_deleted: 0
      },
      raw: true
    })
    const isHeartSent = matching !== null
    return isHeartSent
  }

  async checkIsValidityOfHeart (sendTeamId, receiveTeamId) {
    const matching = await Matching.findOne({
      where: {
        send_team_id: sendTeamId,
        receive_team_id: receiveTeamId,
        is_deleted: 0,
        send_accept_all: 1,
        receive_accept_all: 0
      },
      raw: true
    })
    const isValidityOfHeart = matching !== null
    return isValidityOfHeart
  }

  async findMatchedTeams () {
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

  async findMatchingsIdsByTeamId (teamId) {
    const matchings = await Matching.findAll({
      where: {
        [Op.or]: [{ send_team_id: teamId }, { receive_team_id: teamId }],
        is_deleted: 0
      },
      raw: true
    })
    return matchings
  }

  async findMessage (sendTeamId, receiveTeamId) {
    const message = await Matching.findOne({
      attributes: ['message'],
      where: {
        send_team_id: sendTeamId,
        receive_team_id: receiveTeamId,
        is_deleted: 0
      },
      raw: true
    })
    return message.message
  }

  async deleteMatchingByTeamId (teamId) {
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

  async findMatchingsSentByTeamId (teamId) {
    const matchings = await Matching.findAll({
      attributes: ['id', 'created_at'],
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

  async saveMatching (sendTeamId, receiveTeamId, message) {
    const result = await Matching.create({
      send_team_id: sendTeamId,
      receive_team_id: receiveTeamId,
      message
    })
    return result.id
  }

  async findMatching (matchingId) {
    const matching = await Matching.findOne({
      where: {
        is_deleted: 0,
        id: matchingId
      },
      raw: true
    })
    return matching
  }

  async setMatchingSendAcceptAll (matchingId) {
    await Matching.update(
      {
        send_accept_all: 1
      },
      { where: { id: matchingId } }
    )
  }

  async setMatchingReceiveAcceptAll (matchingId) {
    await Matching.update(
      {
        receive_accept_all: 1
      },
      { where: { id: matchingId } }
    )
  }

  async findReceivedMatchingList (teamId) {
    const teams = await Matching.findAll({
      attributes: ['id'],
      where: {
        receive_team_id: teamId,
        send_accept_all: 1,
        receive_accept_all: 0,
        is_deleted: 0
      },
      include: [{
        model: Team,
        as: 'sendTeam',
        attributes: ['id', 'name', 'place', 'owner_id', 'max_member_number']
      }]
    })
    return teams
  }
}
module.exports = MatchingModel
