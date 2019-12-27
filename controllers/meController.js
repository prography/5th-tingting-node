const SerMe = require('../services/serMe')

const getMyInfo = async (req, res) => {
  const myService = new SerMe()
  //const myInfo = await myService.findMyInfo(req.token.id)
  //const myTeamList = await myService.findMyTeamList(req.token.id)
  const myInfo = await myService.findMyInfo(1)
  const myTeamList = await myService.findMyTeamList(1)
  res.json({
    data: {
      myInfo,
      myTeamList
    }
  })
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
    res.json({
      status: 202
    })
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

module.exports = {
  getMyInfo,
  updateMyInfo
}
