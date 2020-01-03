const getMatchingList = (req, res) => {}
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

module.exports = {
  getMatchingList,
  getMatchingTeamInfo
}
