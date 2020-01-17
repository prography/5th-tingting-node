const MatchingModel = require('../models/MatchingModel')
const ApplyModel = require('../models/ApplyModel')
const AcceptModel = require('../models/AcceptModel')
const UserModel = require('../models/UserModel')
const TeamModel = require('../models/TeamModel')
const BelongModel = require('../models/BelongModel')

class MatchingService {
  constructor () {
    this.matchingModel = new MatchingModel()
    this.applyModel = new ApplyModel()
    this.acceptModel = new AcceptModel()
    this.userModel = new UserModel()
    this.teamModel = new TeamModel()
    this.belongModel = new BelongModel()
  }

  async checkIsMatched (teamId) {
    try {
      const isMatched = await this.matchingModel.checkIsMatched(teamId)
      return isMatched
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async deleteMatchingdata (teamId) {
    try {
      // matching id 찾기 matching deleted 1
      const matchings = await this.matchingModel.findMatchingIdsByTeamId(teamId)
      await this.matchingModel.deleteMatchingByTeamId(teamId)
      // accept apply matching id로 지우기
      for (const matching of matchings) {
        const matchingId = matching.id
        await this.applyModel.deleteApplyByMatchingId(matchingId)
        await this.acceptModel.deleteAcceptByMatchingId(matchingId)
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findAllMatchingList (userId) {
    try {
      const userInfo = await this.userModel.findUserInfo(userId)
      const gender = userInfo.gender
      const verifiedTeamsWithOppositeGender = await this.teamModel.findVerifiedTeamsWithOppositeGender(
        gender
      )
      for (const team of verifiedTeamsWithOppositeGender) {
        const membersInfo = await this.belongModel.findUsersByTeamId(team.id)
        const ownerInfo = await this.userModel.findUserInfo(team.owner_id)
        membersInfo.push({
          id: team.owner_id,
          name: ownerInfo.name,
          thumbnail: ownerInfo.thumbnail
        })
        team.membersInfo = membersInfo
      }
      const matchedTeams = await this.matchingModel.findMatchedTeams()
      let matchedTeamsIdList = []
      matchedTeams.forEach(
        team =>
          (matchedTeamsIdList = matchedTeamsIdList.concat(Object.values(team)))
      )
      const matchingList = verifiedTeamsWithOppositeGender.filter(
        team => !matchedTeamsIdList.includes(team.id)
      )
      return matchingList
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async saveNewMatching (userId, sendTeamId, receiveTeamId, message) {
    try {
      const matchingId = await this.matchingModel.saveMatching(sendTeamId, receiveTeamId, message)
      await this.applyModel.saveApply(userId, matchingId)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}
module.exports = MatchingService
