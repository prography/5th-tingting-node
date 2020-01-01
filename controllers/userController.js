const UserService = require('../services/UserService')

const getUserInfo = async (req, res) => {
  const userService = new UserService()
  try {
    const userInfo = await userService.findUserInfoById(req.params.id)
    res.status(200).json({
      data: {
        userInfo
      }
    })
  } catch (error) {
    res.status(404).json({ errorMessage: '사용자를 찾을 수 없음' })
  }
}

module.exports = {
  getUserInfo
}
