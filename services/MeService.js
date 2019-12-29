const UserModel = require('../models/UserModel')
const TeamModel = require('../models/TeamModel')
const BelongModel = require('../models/BelongModel')

class MeService {
  constructor () {
    this.userModel = new UserModel()
    this.teamModel = new TeamModel()
    this.belongModel = new BelongModel()
  }

  async findMyInfo (userId) {
    try {
      const myInfo = await this.userModel.findUserInfoById(userId)
      // 학교 이름 제공
      return myInfo
    } catch (error) {
      console.log(error)
    }
  }

  async findMyTeamList (userId) {
    try {
      const teamListOwner = await this.teamModel.findMyTeamList(userId).then()
      const teamListId = await this.belongModel.findMyTeamList(userId).then()
      const teamList = teamListOwner.concat(teamListId)
      return teamList
    } catch (error) {
      console.log(error)
    }
  }

  async updateMyInfo (data) {
    try {
      await this.userModel.updateUserInfo(data)
    } catch (error) {
      console.log(error)
    }
  }

  async updateMyTeam (data) {
    try {
      await this.teamModel.updateUserTeam(data)
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = MeService
