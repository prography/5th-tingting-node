const ModelTeam = require('../models/modTeam')

class SerTeam {
  constructor () {
    this.modTeam = new ModelTeam()
  }

  async saveTeam (data) {
    try {
      console.log(data)
      await this.modTeam.saveTeam(data)
    } catch (error) {
      console.log(error)
    }
  }

  async updateMyTeam (data) {
    try {
      await this.modTeam.updateUserTeam(data)
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = SerTeam
