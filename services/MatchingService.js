const MatchingModel = require('../models/MatchingModel')
const ApplyModel = require('../models/ApplyModel')
const AcceptModel = require('../models/AcceptModel')

class MatchingService {
  constructor () {
    this.matchingModel = new MatchingModel()
    this.applyModel = new ApplyModel()
    this.acceptModel = new AcceptModel()
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
      const matchingList = ['1']
      // await this.teamList(userId)
      return matchingList
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = MatchingService
