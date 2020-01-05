const MatchingService = require('../services/MatchingService')

const getMatchingList = async (req, res) => {
  const matchingService = new MatchingService()
  try {
    const matchingList = await matchingService.findMatchingList(1) // req.token.id
    if (matchingList.length === 0) {
      res.status(404).json({ errorMessage: '매칭 팀이 존재하지 않습니다.' })
    } else {
      res.status(200).json({
        data: { matchingList }
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '팀 리스트 불러오기 실패' })
  }
}

// const myTeamList = await 어쩌구Service.findTeamById(req.token.id) //id, name, max_member_number만 받아올것

/*
{
  myteamList: [
    // 만들어진 팀만
    {
      id,
      name,
      max_member_number // 우리팀의 팀원 수와 같은 매칭후보팀만 보여줌
    }
  ]
  matchingTeamList: [
    // 만들어진 팀만
    {
      id,
      name,
      owner_id, // 썸네일 정렬할 때, owner를 맨 앞에 위치시켜줌
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

module.exports = {
  getMatchingList,
  getMatchingTeamInfo
}
