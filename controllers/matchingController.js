const MeService = require('../services/MeService')
const MatchingService = require('../services/MatchingService')
const TeamService = require('../services/TeamService')

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
      query: { myTeamId }
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
          data: {
            teamInfo,
            teamMembers,
            isHeartSent
          }
        })
      }
    }
  } catch (error) {
    res.status(500).json({ errorMessage: '매칭 팀 정보 불러오기 실패' })
  }
}

const getAppliedTeamInfo = async (req, res) => {
  try {
    const {
      query: { myTeamId }
    } = req
    const teamId = req.params.id
    const teamService = new TeamService()
    const matchingService = new MatchingService()
    const teamInfo = await teamService.getTeamInfo(teamId)
    const isValid = await matchingService.checkIsValidityOfHeart(
      teamId,
      myTeamId
    )
    if (teamInfo === null) {
      res.status(404).json({
        errorMessage: '신청 팀이 존재하지 않습니다.'
      })
    } else {
      if (!isValid) {
        res.status(400).json({
          errorMessage: '해당 팀은 매칭을 신청하지 않았습니다.'
        })
      } else {
        const teamMembers = await teamService.getTeamMembersInfo(
          teamId,
          teamInfo.owner_id
        )
        const message = await matchingService.getMessage(teamId, myTeamId)
        res.status(200).json({ data: { teamInfo, teamMembers, message } })
      }
    }
  } catch (error) {
    res.status(500).json({ errorMessage: '신청 팀 정보 불러오기 실패' })
  }
}

const sendHeartForFirst = async (req, res) => {
  try {
    const userId = req.token.id
    const { sendTeamId, receiveTeamId, message } = req.body
    const meService = new MeService()
    const matchingService = new MatchingService()
    const myTeamList = await meService.getMyTeamList(userId)
    const myTeamIdList = myTeamList.map(team => team.id)
    if (!myTeamIdList.includes(sendTeamId)) {
      return res.status(403).json({ errorMessage: '팀에 속해있지 않습니다!' })
    }
    const matchingList = await matchingService.findAllMatchingList(userId)
    const availableTeamIdList = matchingList.map(
      matchingTeam => matchingTeam.id
    )
    if (!availableTeamIdList.includes(receiveTeamId)) {
      return res
        .status(400)
        .json({ errorMessage: '매칭을 신청할 수 있는 팀이 아닙니다!' })
    }
    await matchingService.saveNewMatching(
      userId,
      sendTeamId,
      receiveTeamId,
      message
    )
    res.status(201).json({ data: { message: '매칭 신청하기 성공' } })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '매칭 신청하기 실패' })
  }
}

const sendHeart = async (req, res) => {
  try {
    const userId = req.token.id
    const { matchingId } = req.body
    const meService = new MeService()
    const matchingService = new MatchingService()
    const matchingInfo = await matchingService.getMatchingInfo(matchingId)
    if (!matchingInfo) {
      return res.status(400).json({ errorMessage: '매칭 정보가 없습니다!' })
    }
    if (matchingInfo.send_accept_all === 1) {
      return res
        .status(400)
        .json({ errorMessage: '이미 전원이 하트를 보냈습니다!' })
    }
    const sendTeamId = matchingInfo.send_team_id
    const myTeamList = await meService.getMyTeamList(userId)
    const myTeamIdList = myTeamList.map(team => team.id)
    if (!myTeamIdList.includes(sendTeamId)) {
      return res.status(403).json({ errorMessage: '팀에 속해있지 않습니다!' })
    }
    await matchingService.saveNewApply(userId, matchingId, sendTeamId)
    res.status(201).json({ data: { message: '매칭 신청하기 성공' } })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '매칭 신청하기 실패' })
  }
}

const receiveHeart = async (req, res) => {
  try {
    const userId = req.token.id
    const { matchingId } = req.body
    const meService = new MeService()
    const matchingService = new MatchingService()
    const matchingInfo = await matchingService.getMatchingInfo(matchingId)
    if (!matchingInfo) {
      return res.status(400).json({ errorMessage: '매칭 정보가 없습니다!' })
    }
    if (matchingInfo.send_accept_all === 0) {
      return res
        .status(400)
        .json({ errorMessage: '아직 신청이 완료된 매칭이 아니에요!' })
    }
    if (matchingInfo.receive_accept_all === 1) {
      return res.status(400).json({ errorMessage: '이미 전원이 수락했습니다!' })
    }
    const receiveTeamId = matchingInfo.receive_team_id
    const myTeamList = await meService.getMyTeamList(userId)
    const myTeamIdList = myTeamList.map(team => team.id)
    if (!myTeamIdList.includes(receiveTeamId)) {
      return res.status(403).json({ errorMessage: '팀에 속해있지 않습니다!' })
    }
    await matchingService.saveNewAccept(userId, matchingId, receiveTeamId)
    res.status(201).json({ data: { message: '매칭 수락하기 성공' } })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '매칭 수락하기 실패' })
  }
}

module.exports = {
  getMatchingList,
  getMatchingTeamInfo,
  getAppliedTeamInfo,
  sendHeartForFirst,
  sendHeart,
  receiveHeart
}
