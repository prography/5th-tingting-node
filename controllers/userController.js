const UserService = require('../services/UserService')

const getUserInfo = async (req, res) => {
  const userService = new UserService()
  try {
    const userInfo = await userService.getUserInfo(req.params.id)
    if (userInfo === null) {
      const errorMessage = '사용자가 존재하지 않음'
      console.log({ errorMessage })
      res.status(404).json({ errorMessage })
    } else {
      const data = { userInfo }
      console.log(data)
      res.status(200).json({ data })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
  }
}

module.exports = {
  getUserInfo
}
