const SerMe = require('../services/serMe')
const SerTeam = require('../services/serTeam')

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
        // 학교 이름 제공
      }
    })
  } catch (error) {
    res.status(400).json({ errorMessage: '내정보 불러오기 실패' })
  }
}

const updateMyInfo = async (req, res) => {
  const myService = new SerMe()
  const id = 1 // user id token
  const { name, birth, height, thumbnail } = req.body
  try {
    await myService.updateMyInfo({
      id,
      name,
      birth,
      height,
      thumbnail
    })
    const updateMyInfo = await myService.findMyInfo(id)
    const updatemyTeamList = await myService.findMyTeamList(id)
    res.status(202).json({
      data: {
        updateMyInfo,
        updatemyTeamList
      }
    })
  } catch (error) {
    console.log(error)
    res.status(401).json({ errorMessage: '내 정보 수정 실패' })
    // res 401: Unauthorized
  }
}
const getMyTeamInfo = async (req, res) => {
  const myService = new SerMe()
  const teamService = new SerTeam()
  try {
    const userTeamList = await myService.findMyTeamList(2) // userid token
    req.params.id = parseInt(req.params.id)
    const isUsersTeam = userTeamList.includes(req.params.id)
    if (isUsersTeam) {
      const teamInfo = await teamService.findTeamInfo(req.params.id)
      const teamMember = await teamService.findTeamMemberList(req.params.id)
      res.status(200).json({
        data: {
          teamInfo,
          teamMember
          // 매칭 정보
        }
      })
    } else {
      res.status(401).json({ errorMessage: '팀에 속해있지 않음' })
    }
  } catch (error) {
    console.log(error)
    res.status(404).json({ errorMessage: '팀 정보 없음' })
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
    const userTeamList = await myService.findMyTeamList(2) // userid token
    const isUsersTeam = userTeamList.includes(id)
    if (isUsersTeam) {
      await myService.updateMyTeam({
        id,
        name,
        chat_address,
        owner_id,
        intro,
        password,
        max_member_number
      })
      res.status(202).json({
        data: {
          // 수정 팀 data
        }
      })
    } else { res.status(401).json({ errorMessage: '수정하고자 하는 팀에 속해있지 않음' }) }
  } catch (error) {
    console.log(error)
    res.status(404).json({ errorMessage: '팀 수정 실패' })
  }
}

module.exports = {
  getMyInfo,
  updateMyInfo,
  updateMyTeam,
  getMyTeamInfo
}
