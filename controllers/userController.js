const UserService = require('../services/UserService')
const AuthService = require('../services/AuthService')

const getUserInfo = async (req, res) => {
  const userService = new UserService()
  const authService = new AuthService()
  try {
    const userInfo = await userService.getUserInfo(req.params.id)
    const address = userInfo.authenticated_address
    const school = await authService.findSchoolByEmail(address)
    const schoolName = school.name
    userInfo.schoolName = schoolName
    delete userInfo.authenticated_address
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
