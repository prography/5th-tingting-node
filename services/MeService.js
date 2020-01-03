const UserModel = require('../models/UserModel')
const TeamModel = require('../models/TeamModel')
const BelongModel = require('../models/BelongModel')
const AvailableEmailModel = require('../models/AvailableEmailModel')

class MeService {
  constructor() {
    this.userModel = new UserModel()
    this.teamModel = new TeamModel()
    this.belongModel = new BelongModel()
    this.availableEmailModel = new AvailableEmailModel()
  }

<<<<<<< HEAD
  async getMyInfo (userId) {
=======
  async findMyInfo(userId) {
>>>>>>> 토큰 수정 및 createTaem
    try {
      const myInfo = await this.userModel.findUserInfo(userId)
      const email = myInfo.authenticated_address
      const domain = email.split('@')[1]
      const school = await this.availableEmailModel.findSchoolByDomain(domain)
      const schoolName = school.name
      myInfo.schoolName = schoolName
      delete myInfo.authenticated_address
      return myInfo
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

<<<<<<< HEAD
  async getMyTeamList (userId) {
=======
  async findMyGender(userId) {
    try {
      const myGender = await this.userModel.findUserGenderById(userId)
      return myGender.gender
    } catch (error) {
      console.log(error)
    }
  }

  async findMyTeamList(userId) {
>>>>>>> 토큰 수정 및 createTaem
    try {
      const teamsWithOwner = await this.teamModel.findTeamsOwnedByUserId(userId)
      const teamsWithMember = await this.belongModel.findTeamsByUserId(userId)
      const teamList = teamsWithOwner.concat(teamsWithMember)
      return teamList
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async updateMyInfo(data) {
    try {
      await this.userModel.updateUserInfo(data)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async updateMyTeam(data) {
    try {
      await this.teamModel.updateTeam(data)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async checkIsOwner(data) {
    try {
      const isOwner = await this.teamModel.checkIsOnwer(data)
      return isOwner
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async deleteMyTeam(teamId) {
    // belong table delete all by teamId
    // team table deleted 1
    try {
      await this.belongModel.deleteBelongByTeamId(teamId)
      await this.teamModel.deleteTeam(teamId)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async removeMeFromTeam(data) {
    // belong table delete by userId,teamId
    const isVerified = 0
    const teamId = data.teamId
    // team is_verifiied false
    try {
      await this.belongModel.deleteBelongByUserIdAndTeamId(data)
      await this.teamModel.updateTeamIsVerified({ teamId, isVerified })
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}

module.exports = MeService
