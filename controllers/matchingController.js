const MeService = require('../services/MeService')
const MatchingService = require('../services/MatchingService')
const TeamService = require('../services/TeamService')

const getMatchingList = async (req, res) => {
  try {
    const limit = req.query.limit || 20
    const page = req.query.page || 1
    const userId = req.token.id
    const meService = new MeService()
    const matchingService = new MatchingService()
    const myTeamList = await meService.getMyTeamList(userId)
    const matchingList = await matchingService.findAllMatchingList(userId)
    res.status(200).json({
      data: { myTeamList, matchingList: matchingList.slice((page - 1) * limit, page * limit) }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
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
      const errorMessage = '매칭 팀이 존재하지 않습니다.'
      console.log({ errorMessage })
      res.status(404).json({ errorMessage })
    } else {
      if (!isGathered) {
        const errorMessage =
          '해당 팀은 팀인원 미달로 매칭 자격이 상실되었습니다.'
        console.log({ errorMessage })
        res.status(400).json({ errorMessage })
      } else {
        const teamMembers = await teamService.getTeamMembersInfo(
          teamId,
          teamInfo.owner_id
        )
        const isHeartSent = await matchingService.checkIsHeartSent(
          myTeamId,
          teamId
        )
        const data = {
          teamInfo,
          teamMembers,
          isHeartSent
        }
        console.log(data)
        res.status(200).json({ data })
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
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
      const errorMessage = '신청 팀이 존재하지 않습니다.'
      console.log({ errorMessage })
      res.status(404).json({ errorMessage })
    } else {
      if (!isValid) {
        const errorMessage = '해당 팀은 매칭을 신청하지 않았습니다.'
        console.log({ errorMessage })
        res.status(400).json({ errorMessage })
      } else {
        const teamMembers = await teamService.getTeamMembersInfo(
          teamId,
          teamInfo.owner_id
        )
        const message = await matchingService.getMessage(teamId, myTeamId)
        const data = { teamInfo, teamMembers, message }
        console.log(data)
        res.status(200).json({ data })
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
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
    if (!myTeamIdList.includes(Number(sendTeamId))) {
      const errorMessage = '팀에 속해있지 않습니다!'
      console.log({ errorMessage })
      res.status(403).json({ errorMessage })
    }
    const matchingList = await matchingService.findAllMatchingList(userId)
    const availableTeamIdList = matchingList.map(
      matchingTeam => matchingTeam.id
    )
    if (!availableTeamIdList.includes(Number(receiveTeamId))) {
      const errorMessage = '매칭을 신청할 수 있는 팀이 아닙니다!'
      console.log({ errorMessage })
      res.status(400).json({ errorMessage })
    }
    await matchingService.saveNewMatching(
      userId,
      sendTeamId,
      receiveTeamId,
      message
    )
    const data = { message: '매칭 신청하기 성공' }
    console.log(data)
    res.status(201).json({ data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
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
      const errorMessage = '매칭 정보가 없습니다!'
      console.log({ errorMessage })
      res.status(400).json({ errorMessage })
    }
    if (matchingInfo.send_accept_all === 1) {
      const errorMessage = '이미 전원이 하트를 보냈습니다!'
      console.log({ errorMessage })
      res.status(400).json({ errorMessage })
    }
    const sendTeamId = matchingInfo.send_team_id
    const myTeamList = await meService.getMyTeamList(userId)
    const myTeamIdList = myTeamList.map(team => team.id)
    if (!myTeamIdList.includes(sendTeamId)) {
      const errorMessage = '팀에 속해있지 않습니다!'
      console.log({ errorMessage })
      res.status(403).json({ errorMessage })
    }
    await matchingService.saveNewApply(userId, matchingId, sendTeamId)
    const data = { message: '매칭 신청하기 성공' }
    console.log(data)
    res.status(201).json({ data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
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
      const errorMessage = '매칭 정보가 없습니다!'
      console.log({ errorMessage })
      res.status(400).json({ errorMessage })
    }
    if (matchingInfo.send_accept_all === 0) {
      const errorMessage = '아직 신청이 완료된 매칭이 아니에요!'
      console.log({ errorMessage })
      res.status(400).json({ errorMessage })
    }
    if (matchingInfo.receive_accept_all === 1) {
      const errorMessage = '이미 전원이 수락했습니다!'
      console.log({ errorMessage })
      res.status(400).json({ errorMessage })
    }
    const receiveTeamId = matchingInfo.receive_team_id
    const myTeamList = await meService.getMyTeamList(userId)
    const myTeamIdList = myTeamList.map(team => team.id)
    if (!myTeamIdList.includes(receiveTeamId)) {
      const errorMessage = '팀에 속해있지 않습니다!'
      console.log({ errorMessage })
      res.status(403).json({ errorMessage })
    }
    await matchingService.saveNewAccept(userId, matchingId, receiveTeamId)
    const data = { message: '매칭 수락하기 성공' }
    console.log(data)
    res.status(201).json({ data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
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
