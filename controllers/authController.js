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
    res.status(200).json({
      code: 200,
      message: '로그인 & 토큰 발행'
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
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
  const authService = new AuthService()
  const {
    query: { name }
  } = req
  const isDuplicateName = await authService.findUserNameByName(name)
  if (isDuplicateName) {
    res.status(403).json('이미 존재하는 이름입니다.')
  } else {
    res.status(200).json('사용 가능한 이름입니다.')
  }
}

const checkValidEmail = async (req, res) => {
  const authService = new AuthService()
  const {
    body: { email, name }
  } = req
  const isValidSchool = await authService.findSchoolByEmail(email)
  const isDuplicateEmail = await authService.findAuthenticatedEmailByEmail(
    email
  )
  if (isDuplicateEmail) {
    res.status(404).json('이미 가입된 이메일입니다.')
  } else if (!isValidSchool) {
    res.status(404).json('가입이 불가능한 이메일입니다.')
  } else {
    await authService.saveNameAndAuthenticatedEmail(name, email)
    await authService.sendEmail(email)
    res.status(202).json('이메일에 인증번호를 전송했습니다.')
  }
}

const confirmEmailToken = async (req, res) => {
  const authServcie = new AuthService()
  const { token } = req
  try {
    await authServcie.saveIsAuthenticated(token)
    res.status(202).json('이메일 인증이 완료되었습니다.')
  } catch (error) {
    console.log(error)
    res.status(403).json('이메일 인증에 실패하였습니다.')
  }
}

module.exports = {
  signup,
  login,
  logout,
  checkDuplicateName,
  checkValidEmail,
  confirmEmailToken
}
