const SerUser = require('../services/serUser')

const getTeamList = async (req, res) => {
  const userService = new SerUser()
  const teamList = await userService.findMyTeamList(req.params.id).then()
  console.log(teamList)
  console.log(req.params.id)
  res.send({ teamList })
}

const getUserInfo = async (req, res) => {
  const userService = new SerUser()
  const userInfo = await userService.findUserInfoById(req.params.id).then()
  res.send({
    userInfo: userInfo
  })
}

module.exports = {
  getTeamList,
  getUserInfo
}
