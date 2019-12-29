const SerMe = require('../services/serMe')

const getMyInfo = async (req, res) => {
  const myService = new SerMe()
  // const myInfo = await myService.findMyInfo(req.token.id)
  // const myTeamList = await myService.findMyTeamList(req.token.id)
  try {
    const myInfo = await myService.findMyInfo(1)
    const myTeamList = await myService.findMyTeamList(1)
    res.status(200).json({
      data: {
        myInfo,
        myTeamList
      }
    })
  } catch (error) {
    res.status(400).json('내정보 불러오기 실패')
  }
}

const updateMyInfo = async (req, res) => {
  const myService = new SerMe()
  const id = 1
  const { name, birth, height, thumbnail } = req.body
  try {
    await myService.updateMyInfo({
      id,
      name,
      birth,
      height,
      thumbnail
    })
    res.status(202).json('내 정보 수정 성공')
  } catch (error) {
    console.log(error)
    res.status(401).json('내 정보 수정 실패')
    // res 401: Unauthorized
  }
}

// 팀 수정
const updateMyTeam = async (req, res) => {
  const myService = new SerMe()
  const id = req.params.id// team id
  const {
    body: {
      name,
      chat_address,
      owner_id,
      intro,
      password,
      max_member_number
    }
  } = req
  try {
    // user의 팀이 맞는지 확인 필요
    const userTeamList = await myService.findMyTeamList(2) // userid token
    const isUsersTeam = userTeamList.filter(list => id.includes(list))
    if (isUsersTeam == id) {
      await myService.updateMyTeam({
        id,
        name,
        chat_address,
        owner_id,
        intro,
        password,
        max_member_number
      })
      res.status(202).json('팀 수정 성공')
    } else { res.status(401).json('수정하고자 하는 팀에 속해있지 않음') }
  } catch (error) {
    console.log(error)
    res.status(404).json('팀 수정 실패')
  }
}

module.exports = {
  getMyInfo,
  updateMyInfo,
  updateMyTeam
}
