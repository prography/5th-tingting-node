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

  // matching api
  async findMatchingList (userId) {
    // 그냥 매칭된 팀 제외

    // 내가 accept,apply한 팀 제외 -> apply의 matchingid -> matchingid의 sende_team_id
    // 나중에 지우지 말고 같은 팀원 동의 현황 같은 내용 보여주면 좋을 듯
    try {
      const matchingIdsFromApply = await this.applyModel.findApplyListByUserId(userId) // 삭제해도됨.//이후 미구현
      const matchingIdsFromAccept = await this.acceptModel.findAcceptListByUserId(userId) // 삭제해도됨.//이후 미구현

      const matchedTeamList = await this.matchingModel.findMatchedList()// 삭제해도됨. //미구현
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = MatchingService
