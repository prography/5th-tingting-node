const MatchingModel = require('../models/MatchingModel')
const ApplyModel = require('../models/ApplyModel')
const AcceptModel = require('../models/AcceptModel')
const UserModel = require('../models/UserModel')
const TeamModel = require('../models/TeamModel')
const BelongModel = require('../models/BelongModel')
const TeamTagModel = require('../models/TeamTagModel')

class MatchingService {
  constructor () {
    this.matchingModel = new MatchingModel()
    this.applyModel = new ApplyModel()
    this.acceptModel = new AcceptModel()
    this.userModel = new UserModel()
    this.teamModel = new TeamModel()
    this.belongModel = new BelongModel()
    this.teamTagModel = new TeamTagModel()
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

  async checkIsHeartSent (sendTeamId, receiveTeamId) {
    try {
      const isHeartSent = await this.matchingModel.checkIsHeartSent(
        sendTeamId,
        receiveTeamId
      )
      return isHeartSent
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async checkIsValidityOfHeart (sendTeamId, receiveTeamId) {
    try {
      const isValdityOfHeart = await this.matchingModel.checkIsValidityOfHeart(
        sendTeamId,
        receiveTeamId
      )
      return isValdityOfHeart
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async deleteMatchingdata (teamId) {
    try {
      // matching id 찾기 matching deleted 1
      const matchings = await this.matchingModel.findMatchingsByTeamId(teamId)
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
        const tagList = []
        const teamTags = await this.teamTagModel.findTeamTagsByTeamId(team.id)
        for (const [index, teamTag] of teamTags.entries()) {
          tagList[index] = teamTag.tags.name
        }
        team.tags = tagList
        const membersInfo = await this.belongModel.findUsersByTeamId(team.id)
        for (const memberInfo of membersInfo) {
          memberInfo.thumbnail = `${process.env.HOST_BASE_URL}/api/v1/users/${memberInfo.id}/thumbnail-img`
        }
        const ownerInfo = await this.userModel.findUserInfo(team.owner_id)
        membersInfo.push({
          id: team.owner_id,
          name: ownerInfo.name,
          thumbnail: `${process.env.HOST_BASE_URL}/api/v1/users/${ownerInfo.id}/thumbnail-img`
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
      const matchingId = await this.matchingModel.saveMatching(
        sendTeamId,
        receiveTeamId,
        message
      )
      await this.applyModel.saveApply(userId, matchingId)
      const applys = await this.applyModel.findApplysByMatchingId(matchingId)
      const teamInfo = await this.teamModel.findTeamInfo(sendTeamId)
      if (applys.length === teamInfo.max_member_number) {
        await this.matchingModel.setMatchingSendAcceptAll(matchingId)
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async getMatchingInfo (matchingId) {
    try {
      const matchingInfo = await this.matchingModel.findMatching(matchingId)
      return matchingInfo
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async getMessage (sendTeamId, receiveTeamId) {
    try {
      const message = await this.matchingModel.findMessage(
        sendTeamId,
        receiveTeamId
      )
      return message
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async saveNewApply (userId, matchingId, sendTeamId) {
    try {
      const prevApply = await this.applyModel.findApplyByUserIdAndMatchingId(
        userId,
        matchingId
      )
      if (!prevApply) {
        await this.applyModel.saveApply(userId, matchingId)
        const applys = await this.applyModel.findApplysByMatchingId(matchingId)
        const teamInfo = await this.teamModel.findTeamInfo(sendTeamId)
        if (applys.length === teamInfo.max_member_number) {
          await this.matchingModel.setMatchingSendAcceptAll(matchingId)
        }
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async saveNewAccept (userId, matchingId, receiveTeamId) {
    try {
      const prevAccept = await this.acceptModel.findAcceptByUserIdAndMatchingId(
        userId,
        matchingId
      )
      if (!prevAccept) {
        await this.acceptModel.saveAccept(userId, matchingId)
        const accepts = await this.acceptModel.findAcceptsByMatchingId(
          matchingId
        )
        const teamInfo = await this.teamModel.findTeamInfo(receiveTeamId)
        if (accepts.length === teamInfo.max_member_number) {
          await this.matchingModel.setMatchingReceiveAcceptAll(matchingId)
        }
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}

module.exports = MatchingService
