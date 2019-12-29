const ModelTeam = require('../models/modTeam')
const ModelBelong = require('../models/modBelong')

class SerTeam {
  constructor () {
    this.modTeam = new ModelTeam()
    this.modBelong = new ModelBelong()
  }

  async saveTeam (data) {
    try {
      await this.modTeam.saveTeam(data)
    } catch (error) {
      console.log(error)
    }
  }

  async findAllTeamListWithoutMe (userId) {
    try {
      const ListIsNotOwner = await this.modTeam.findTeamListIsNotOwner(userId)
      const ListIsNotBelong = await this.modBelong.findTeamListIsNotBelong(
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
}
module.exports = SerTeam
