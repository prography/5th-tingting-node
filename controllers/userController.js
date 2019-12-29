const SerUser = require('../services/serUser')

const getUserInfo = async (req, res) => {
  const userService = new SerUser()
  const userInfo = await userService.findUserInfoById(req.params.id).then()
  res.status(200).json({
    data: {
      userInfo: userInfo
    }
  })
  // res 404: Not Found
}

module.exports = {
  getUserInfo
}
