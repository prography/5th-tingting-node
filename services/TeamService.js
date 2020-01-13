const TeamModel = require('../models/TeamModel')
const BelongModel = require('../models/BelongModel')
const UserModel = require('../models/UserModel')

class TeamService {
  constructor () {
    this.teamModel = new TeamModel()
    this.belongModel = new BelongModel()
    this.userModel = new UserModel()
  }

  async saveTeam (data) {
    try {
      const ownerId = data.owner_id
      const userInfo = await this.userModel.findUserInfo(ownerId)
      const gender = userInfo.gender
      data.gender = gender
      await this.teamModel.saveTeam(data)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async checkIsDuplicatedTeamName (name) {
    try {
      const team = await this.teamModel.findTeamByName(name)
      const isDuplicated = team && true
      return isDuplicated
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findAllTeamListWithoutMe (userId) {
    try {
      const userInfo = await this.userModel.findUserInfo(userId)
      const gender = userInfo.gender
      const teamsWithNoneOwner = await this.teamModel.findTeamsWithNoneOwner(
        userId,
        gender
      )
      const teamsWithMember = await this.belongModel.findTeamsByUserId(userId)
      const teamList = teamsWithNoneOwner.filter(team => {
        const teamIdListWithMember = teamsWithMember.map(team => team.id)
        return !teamIdListWithMember.includes(team.id)
      })
      for (const idx in teamList) {
        const teamMembersInfo = await this.belongModel.findUsersByTeamId(
          teamList[idx].id
        )
        teamList[idx].teamMembersInfo = teamMembersInfo
      }
      return teamList
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async getTeamInfo (teamId) {
    try {
      const teamInfo = await this.teamModel.findTeamInfo(teamId)
      if (teamInfo) delete teamInfo.password
      return teamInfo
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async getTeamMembersInfo (teamId) {
    try {
      const teamMembersInfo = await this.belongModel.findUsersByTeamId(teamId)
      return teamMembersInfo
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async checkIsGathered (teamId) {
    try {
      const isGathered = await this.teamModel.checkIsGathered(teamId)
      return isGathered
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async joinTeamToBelong (teamId, userId) {
    try {
      await this.belongModel.createTeamMember({ teamId, userId })
      const belongMemberList = await this.belongModel.findTeamMembersWhoBelongto(
        teamId
      )
      const maxMemberNumber = await this.teamModel.findTeamMaxMemberNum(teamId)
      if (belongMemberList.length + 1 === maxMemberNumber) {
        await this.teamModel.updateTeamIsVerified({ teamId, is_verified: 1 })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getTeamGender (teamId) {
    try {
      const teamGender = await this.teamModel.findTeamGender(teamId)
      return teamGender
    } catch (error) {
      console.log(error)
    }
  }

  async getTeamPassword (teamId) {
    try {
      const teamPassword = await this.teamModel.findTeamPassword(teamId)
      return teamPassword
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = TeamService
