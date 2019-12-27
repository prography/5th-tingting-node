const ModelUser = require('../models/modUser')
const ModelTeam = require('../models/modTeam')
const ModelBelong = require('../models/modBelong')

class serMe {
  constructor () {
    this.modUser = new ModelUser()
    this.modTeam = new ModelTeam()
    this.modBelong = new ModelBelong()
  }

  async findMyInfo (userId) {
    try {
      const myInfo = await this.modUser.findUserInfoById(userId)
      return myInfo
    } catch (error) {
      console.log(error)
    }
  };

  async findMyTeamList (userId) {
    try {
      const teamListOwner = await this.modTeam.findMyTeamList(userId).then()
      const teamListId = await this.modBelong.findMyTeamList(userId).then()
      const teamList = teamListOwner.concat(teamListId)
      return teamList
    } catch (error) {
      console.log(error)
    }
  }

  async updateMyInfo (data) {
    try {
      await this.modUser.updateUserInfo(data)
    } catch (error) {
      console.log(error)
    }
  };
}
module.exports = serMe
