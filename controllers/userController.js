const UserService = require('../services/UserService')

const getUserInfo = async (req, res) => {
  const userService = new UserService()
  try {
    const userInfo = await userService.findUserInfoById(req.params.id)
    /// 음... null별로인데.. 일단 썼습니다.
    if (userInfo === null) {
      res.status(404).json({ errorMessage: '사용자가 존재하지 않음' })
    } else {
      res.status(200).json({
        data: {
          userInfo
        }
      })
    }
  } catch (error) {
    res.status(500).json({ errorMessage: '사용자 불러오기 실패' })
  }
}

module.exports = {
  getUserInfo
}
