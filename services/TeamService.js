const TeamModel = require('../models/TeamModel')
const BelongModel = require('../models/BelongModel')

class TeamService {
  constructor () {
    this.teamModel = new TeamModel()
    this.belongModel = new BelongModel()
  }

  async saveTeam (data) {
    try {
      await this.teamModel.saveTeam(data)
    } catch (error) {
      console.log(error)
    }
  }

  async findAllTeamListWithoutMe (userId) {
    try {
      const ListIsNotOwner = await this.teamModel.findTeamListIsNotOwner(userId)
      const ListIsNotBelong = await this.belongModel.findTeamListIsNotBelong(
        userId
      )
      const teamList = ListIsNotOwner.filter(list =>
        ListIsNotBelong.includes(list)
      )
      return teamList
    } catch (error) {
      console.log(error)
    }
  }

  async findTeamInfo (teamId) {
    try {
      const teamInfo = await this.teamModel.findUserTeamInfo(teamId)
      return teamInfo
    } catch (error) {
      console.log(error)
    }
  }

  async findTeamMemberList (teamId) {
    try {
      const belongMember = await this.belongModel.findTeamMemberWhoBelongto(teamId)
      return belongMember
    } catch (error) {
      console.log(error)
    }
  }

  async isGathered (teamId) {
    try {
      const gathered = await this.teamModel.isGathered(teamId)
      const isgathered = gathered.includes(1)
      return isgathered
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = TeamService
