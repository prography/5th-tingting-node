const UserService = require('../services/serUser')
const AuthService = require('../services/serAuth')

const signup = async (req, res, next) => {
  const userService = new UserService()
  const authService = new AuthService()
  const {
    kakao_id,
    password,
    name,
    birth,
    height,
    thumbnail,
    authenticated_address,
    gender
  } = req.body
  try {
    const exUser = await userService.findUserInfoByKaKaoId(kakao_id) // To Do: parameter 수정 필요
    if (exUser === []) {
      res.status(403).json('이미 가입된 사용자입니다.')
      // redirect로 바꿔야되나?
    } else {
      const encryptInfo = await authService.encryptPassword(password)
      console.log('encryptInfo: ', encryptInfo)
      await userService.saveUser({
        kakao_id,
        password: encryptInfo.encryptedpassword,
        salt: encryptInfo.salt,
        name,
        birth,
        height,
        thumbnail,
        authenticated_address,
        gender
      })
      res.status(201).json('회원가입 성공')
    }
  } catch (error) {
    console.log(error)
    res.status(400).json('회원가입 실패')
  }
}

const login = async (req, res) => {
  const userService = new UserService()
  const authService = new AuthService()
  // To Do: req.body 부분 및 token의 parameter 수정 -> password 추가
  const { kakao_id } = req.body
  try {
    // 유저 맞는지 확인 필요 (1.id 있는지 2.password confirm)
    const userInfo = await userService.findUserInfoByKaKaoId(kakao_id)
    const token = authService.makeToken(userInfo)
    console.log('Issued token: ', token)
    return res.status(200).json({
      code: 200,
      message: '로그인 & 토큰 발행'
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      code: 400,
      message: '로그인 실패'
    })
  }
}

const logout = (req, res) => {
  req.logout()
  res.redirect('/')
}

module.exports = {
  signup,
  login,
  logout
}
