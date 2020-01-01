const MatchingModel = require('../models/MatchingModel')
const ApplyModel = require('../models/ApplyModel')
const AcceptModel = require('../models/AcceptModel')

class MatchingService {
  constructor () {
    this.matchingModel = new MatchingModel()
    this.applyModel = new ApplyModel()
    this.acceptModel = new AcceptModel()
  }

  async isMatched (teamId) {
    try {
      const matchingList = await this.matchingModel.isMatched(teamId)
      const isMatching = matchingList.includes(1)
      return isMatching
    } catch (error) {
      console.log(error)
    }
  }

  async deleteMatchingdata (teamId) {
    try {
      // matching id 찾기 matching deleted 1
      const matchingIdList = await this.matchingModel.findMatchingIdByTeam(teamId)
      await this.matchingModel.deleteMatchingTeam(teamId)
      // accept apply matching id로 지우기
      for (var i in matchingIdList) {
        await this.applyModel.deleteApplyByMatchingId(matchingIdList[i])
        await this.acceptModel.deleteAcceptByMatchingId(matchingIdList[i])
      }
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = MatchingService
