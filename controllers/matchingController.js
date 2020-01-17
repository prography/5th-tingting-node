const MeService = require('../services/MeService')
const MatchingService = require('../services/MatchingService')

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
    res.status(500).json({ errorMessage: '팀 리스트 불러오기 실패' })
  }
}

const getMatchingTeamInfo = (req, res) => {}
// 응답 형식
/*
{
    team: {
        id,
        chat_address,
        name,
        owner_id,
        intro,
        gender,
        max_member_number
    },
    isMatched: 0, //이거에 따라 '수락대기중' or '수락하기' 버튼 보여주면 됨
    teamMembers: [
        {
            id,
            isOwner,
            name,
            thumbnail
        }
    ],
    message: "저희랑 미팅해요오"
}
*/

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
    const availableTeamIdList = matchingList.map(matchingTeam => matchingTeam.id)
    if (!availableTeamIdList.includes(receiveTeamId)) {
      return res.status(400).json({ errorMessage: '매칭을 신청할 수 있는 팀이 아닙니다!' })
    }
    await matchingService.saveNewMatching(userId, sendTeamId, receiveTeamId, message)
    res.sendStatus(201)
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '매칭 신청하기 실패' })
  }
}

module.exports = {
  getMatchingList,
  getMatchingTeamInfo,
  sendHeartForFirst
}
