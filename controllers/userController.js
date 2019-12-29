const UserService = require('../services/UserService')

const getUserInfo = async (req, res) => {
  const userService = new UserService()
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
