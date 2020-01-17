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

  async getTeamMembersInfo (teamId, ownerId) {
    try {
      const teamMembersInfo = await this.belongModel.findUsersByTeamId(teamId)
      const ownerInfo = await this.userModel.findUserInfo(ownerId)
      teamMembersInfo.push({
        id: ownerId,
        name: ownerInfo.name,
        thumbnail: ownerInfo.thumbnail
      })
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
      const teamMemberIdList = await this.belongModel.findTeamMemberIdListWhoBelongto(
        teamId
      )
      const teamInfo = await this.teamModel.findTeamInfo(teamId)
      const maxMemberNumber = teamInfo.max_member_number
      if (teamMemberIdList.length + 1 === maxMemberNumber) {
        await this.teamModel.updateTeamIsVerified({ teamId, is_verified: 1 })
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async getTeamPassword (teamId) {
    try {
      const teamPassword = await this.teamModel.findTeamPassword(teamId)
      return teamPassword
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}

module.exports = TeamService
