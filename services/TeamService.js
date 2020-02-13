const TeamModel = require('../models/TeamModel')
const BelongModel = require('../models/BelongModel')
const UserModel = require('../models/UserModel')
const MatchingModel = require('../models/MatchingModel')

class TeamService {
  constructor () {
    this.teamModel = new TeamModel()
    this.belongModel = new BelongModel()
    this.userModel = new UserModel()
    this.matchingModel = new MatchingModel()
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
        const teamPassword = await this.teamModel.findTeamPassword(
          teamList[idx].id
        )
        teamList[idx].hasPassword = teamPassword !== null && teamPassword !== '' // legacy
        const teamMembersInfo = await this.belongModel.findUsersByTeamId(
          teamList[idx].id
        )
        for (const teamMemberInfo of teamMembersInfo) {
          teamMemberInfo.thumbnail = `https://api.tingting.kr/api/v1/users/${teamMemberInfo.id}/thumbnail-img`
        }
        const ownerInfo = await this.userModel.findUserInfo(teamList[idx].owner_id)
        teamMembersInfo.push({
          id: teamList[idx].owner_id,
          name: ownerInfo.name,
          thumbnail: `https://api.tingting.kr/api/v1/users/${teamList[idx].owner_id}/thumbnail-img`
        })
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
      if (teamInfo) {
        teamInfo.hasPassword = teamInfo.password !== null && teamInfo.password !== ''
        delete teamInfo.password
      }
      if (teamInfo) { return teamInfo }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async getTeamMembersInfo (teamId, ownerId) {
    try {
      const teamMembersInfo = await this.belongModel.findUsersByTeamId(teamId)
      const ownerInfo = await this.userModel.findUserInfo(ownerId)
      for (const teamMemberInfo of teamMembersInfo) {
        teamMemberInfo.thumbnail = `https://api.tingting.kr/api/v1/users/${teamMemberInfo.id}/thumbnail-img`
      }
      teamMembersInfo.push({
        id: ownerId,
        name: ownerInfo.name,
        thumbnail: `https://api.tingting.kr/api/v1/users/${ownerId}/thumbnail-img`
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

  async getTeamMatchingInfo (teamId) {
    try {
      const teamReceivedList = await this.matchingModel.findReceivedMatchingList(teamId)

      for (const team of teamReceivedList) {
        const membersInfo = await this.belongModel.findUsersByTeamId(team.sendTeam.id)
        for (const memberInfo of membersInfo) {
          memberInfo.thumbnail = `https://api.tingting.kr/api/v1/users/${memberInfo.id}/thumbnail-img`
        }
        const ownerInfo = await this.userModel.findUserInfo(team.sendTeam.owner_id)
        membersInfo.push({
          id: team.sendTeam.owner_id,
          name: ownerInfo.name,
          thumbnail: `https://api.tingting.kr/api/v1/users/${team.sendTeam.owner_id}/thumbnail-img`
        })
        team.sendTeam.dataValues.membersInfo = membersInfo
      }
      return teamReceivedList
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}

module.exports = TeamService
