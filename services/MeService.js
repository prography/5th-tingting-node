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

  async findMyGender (userId) {
    try {
      const myGender = await this.userModel.findUserGenderById(userId)
      return myGender.gender
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

  async checkIsOwner (data) {
    try {
      const isOwner = await this.teamModel.checkIsOnwer(data)
      return isOwner
    } catch (error) {
      console.log(error)
    }
  }

  async deleteMyTeam (teamId) {
    // belong table delete all by teamId
    // team table deleted 1
    try {
      await this.belongModel.deleteBelongByTeamId(teamId)
      await this.teamModel.deleteTeam(teamId)
    } catch (error) {
      console.log(error)
    }
  }

  async removeMeFromTeam (data) {
    // belong table delete by userId,teamId
    const is_verified = 0
    const teamId = data.teamId
    // team is_verifiied false
    try {
      await this.belongModel.deleteBelongByUserIdAndTeamId(data)
      await this.teamModel.updateTeamVerify({ teamId, is_verified })
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = MeService
