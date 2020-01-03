/*
{
  mytemaList: [
    //매칭된 팀만
    {
      id,
      name,
      max_member_number
    }
  ]
  teamList: [
    //매칭된 팀만
    {
      id,
      name,
      owner_id,
      max_member_number,
      teamMembers: [
        {
          id,
          thumbnail
        }
      ]
    }
  ]
}
*/

const getMatchingTeamInfo = (req, res) => {}
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

const MatchingService = require('../services/MatchingService')

const getMatchingList = async (req, res) => {
  const matchingService = new MatchingService()
  try {
    const matchingList = await matchingService.findMatchingList(1)//req.token.id
    if (matchingList.length === 0) {
      res.status(404).json({ errorMessage: '매칭 팀이 존재하지 않습니다.' })
    } else {
      res.status(200).json({
        data: { matchingList }
      })
    }
  } catch{
    console.log(error)
    res.status(500).json({ errorMessage: '팀 리스트 불러오기 실패' })
  }
}

module.exports = {
  getMatchingList
}
