const MeService = require('../services/MeService')
const MatchingService = require('../services/MatchingService')
const TeamService = require('../services/TeamService')

// 전체 매칭 리스트
const getMatchingList = async (req, res) => {
  try {
    const userId = req.token.id
    const meService = new MeService()
    const matchingService = new MatchingService()
    const myTeamList = await meService.getMyTeamList(userId)
    const matchingList = await matchingService.findAllMatchingList(userId)
    res.status(200).json({
      data: { myTeamList, matchingList }
    })
  } catch (error) {
    res.status(500).json({ errorMessage: '매칭 팀 리스트 불러오기 실패' })
  }
}

const getMatchingTeamInfo = async (req, res) => {
  try {
    const {
      body: { myTeamId }
    } = req
    const teamId = req.params.id
    const teamService = new TeamService()
    const matchingService = new MatchingService()
    const teamInfo = await teamService.getTeamInfo(teamId)
    const isGathered = await teamService.checkIsGathered(teamId)
    if (teamInfo === null) {
      res.status(404).json({
        errorMessage: '매칭 팀이 존재하지 않습니다.'
      })
    } else {
      if (!isGathered) {
        res.status(400).json({
          errorMessage: '해당 팀은 팀인원 미달로 매칭 자격이 상실되었습니다.'
        })
      } else {
        const teamMembers = await teamService.getTeamMembersInfo(
          teamId,
          teamInfo.owner_id
        )
        const isHeartSent = await matchingService.checkIsHeartSent(
          myTeamId,
          teamId
        )
        res.status(200).json({
          teamInfo,
          teamMembers,
          isHeartSent
        })
      }
    }
  } catch (error) {
    res.status(500).json({ errorMessage: '매칭 팀 정보 불러오기 실패' })
  }
}

module.exports = {
  getMatchingList,
  getMatchingTeamInfo
}
