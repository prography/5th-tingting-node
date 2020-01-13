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

      // 1) (유저와 gender 다름 && is_deleted === 0 && is_verified === 1) 전체 이성 팀 list
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

      // 2) (verified_at !== null && is_deleted == 0) 이미 매칭된 팀 id list 만들기
      const matchedTeams = await this.matchingModel.findMatchedTeams()
      let matchedTeamsIdList = []
      matchedTeams.forEach(
        team =>
          (matchedTeamsIdList = matchedTeamsIdList.concat(Object.values(team)))
      )

      // 1) - 2)
      const matchingList = verifiedTeamsWithOppositeGender.filter(
        team => !matchedTeamsIdList.includes(team.id)
      )
      return matchingList
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = MatchingService
