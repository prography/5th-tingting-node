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

module.exports = {
  getMatchingList,
  getMatchingTeamInfo
}
