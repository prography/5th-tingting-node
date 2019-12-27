const UserService = require('../services/serUser')
const AuthService = require('../services/serAuth')

const signup = async (req, res, next) => {
  const userService = new UserService()
  const authService = new AuthService()
  const {
    body: {
      kakao_id,
      name,
      birth,
      height,
      thumbnail,
      authenticated_address,
      gender
    }
  } = req
  try {
    const exUser = await userService.findUserInfoByKaKaoId(kakao_id) // To Do: parameter 수정 필요
    if (exUser === []) {
      res.status(403).json('이미 가입된 사용자입니다.')
      // redirect로 바꿔야되나?
    } else {
      await userService.saveUser({
        kakao_id,
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
  // To Do: req.body 부분 및 token의 parameter 수정
  const { kakao_id } = req.body
  try {
    // 유저 맞는지 확인 필요 (1.id 있는지)
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

const checkDuplicateName = async (req, res) => {
  const userService = new UserService()
  const {
    query: { name }
  } = req
  const isDuplicatedName = await userService.findUserIdByName(name)
  console.log(isDuplicatedName)
  if (isDuplicatedName) {
    return res.status(403).json('이미 존재하는 이름입니다.')
  }
  return res.status(200).json('중복된 이름이 없습니다.')
}

module.exports = {
  signup,
  login,
  logout,
  checkDuplicateName
}
