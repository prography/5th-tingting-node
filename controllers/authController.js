const UserService = require('../services/UserService')
const AuthService = require('../services/AuthService')

const kakaoLogin = (req, res) => {
  // To Do : 배포시 process.env.KAKAO_REDIRECTURI 수정 필요
  const authService = new AuthService()
  const userConsentURL = authService.makeUserConsentURL()
  res.status(302).redirect(userConsentURL)
}

const getAccessTokenByKakaoCode = async (req, res) => {
  const authService = new AuthService()
  try {
    if (req.query.code) {
      const {
        query: { code }
      } = req
      const accessToken = await authService.getAccessToken(code)
      res.status(200).json({ data: { accessToken } })
    } else {
      res.status(401).json({
        errorMessage: '개인정보 제공에 대해 사용자의 동의를 얻지 못했습니다.'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ errorMessage: '카카오 계정 인증에 실패하였습니다.' })
    // redirect('http://localhost:3000/api/v1/auth/kakao') 이부분 고민 -> URL은 나중에 배포하면 바꿔야함!!!!!!
  }
}

const kakaoSignup = async (req, res, next) => {
  const userService = new UserService()
  const authServcie = new AuthService()
  try {
    const schema = req.headers.authorization
    const accessToken = schema.replace('Bearer ', '')
    const kakao_id = await authServcie.getKakaoId(accessToken)
    const {
      body: { name, birth, height, thumbnail, authenticated_address, gender }
    } = req
    const exUser = await userService.findUserInfoByKaKaoId(kakao_id)
    if (exUser === []) {
      res.status(403).json({ errorMessage: '이미 가입된 사용자입니다.' })
      // To Do : redirect 필요?
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
      res.status(201).json({ data: { message: '회원가입에 성공했습니다.' } })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ errorMessage: '회원가입에 실패했습니다.' })
  }
}

const localLogin = async (req, res) => {
  const userService = new UserService()
  const authService = new AuthService()
  const {
    body: { local_id, password }
  } = req
  try {
    const authInfo = await userService.findAuthInfoByLocalId(local_id)
    if (authInfo) {
      // local_id, password 일치 확인
      const isCorrectPassword = authService.verifyPassword(
        authInfo.salt,
        authInfo.password,
        password
      )
      if (isCorrectPassword) {
        // Token 만들기
        const token = authService.makeToken(authInfo.id)
        console.log('Issued token: ', token)
        res.status(200).json({
          data: '로그인에 성공했습니다. & 토큰이 발행되었습니다.'
        })
      } else {
        res.status(401).json({
          data: '비밀번호가 틀렸습니다.'
        })
      }
    } else {
      res.status(401).json({
        errorMessage: '존재하지 않는 아이디입니다.'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      errorMessage: '로그인 실패'
    })
  }
}

const localSignup = async (req, res) => {
  const userService = new UserService()
  const authService = new AuthService()
  const {
    body: {
      local_id,
      password,
      name,
      birth,
      height,
      thumbnail,
      authenticated_address,
      gender
    }
  } = req
  try {
    const exUserId = await userService.findUserIdByLocalId(local_id)
    if (exUserId) {
      res.status(403).json({ data: { message: '이미 가입된 사용자입니다.' } })
    } else {
      const encryptInfo = await authService.encryptPassword(password)
      await userService.saveUserByLocal({
        local_id,
        password: encryptInfo.encryptedpassword,
        salt: encryptInfo.salt,
        name,
        birth,
        height,
        thumbnail,
        authenticated_address,
        gender
      })
      res.status(201).json({ data: { message: '회원가입 성공' } })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ data: { message: '회원가입에 실패하였습니다.' } })
  }
}

const logout = (req, res) => {
  req.logout()
  res.redirect('/')
}

const checkDuplicateLocalId = async (req, res) => {
  const authService = new AuthService()
  const {
    query: { local_id }
  } = req
  const isDuplicateLocalId = await authService.findExistingLocalIdByLocalId(
    local_id
  )
  if (isDuplicateLocalId) {
    res.status(400).json({ errorMessage: '이미 존재하는 아이디입니다.' })
  } else {
    res.status(200).json({ data: { message: '사용 가능한 아이디입니다.' } })
  }
}

const checkDuplicateName = async (req, res) => {
  const authService = new AuthService()
  const {
    query: { name }
  } = req
  const isDuplicateName = await authService.findExistingNameByName(name)
  if (isDuplicateName) {
    res.status(400).json({ errorMessage: '이미 존재하는 이름입니다.' })
  } else {
    res.status(200).json({ data: { message: '사용 가능한 이름입니다.' } })
  }
}

const checkValidEmail = async (req, res) => {
  const authService = new AuthService()
  const {
    body: { email, name }
  } = req
  const isValidSchool = await authService.findSchoolByEmail(email)
  const isDuplicateEmail = await authService.findExistingAuthenticatedAddressByEmail(
    email
  )
  if (isDuplicateEmail) {
    res.status(400).json({ errorMessage: '이미 가입된 이메일입니다.' })
  } else if (!isValidSchool) {
    res.status(401).json({ errorMessage: '가입이 불가능한 이메일입니다.' })
  } else {
    await authService.saveNameAndAuthenticatedEmail(name, email)
    await authService.sendEmail(email)
    res.status(201).json({ data: { message: '인증메일을 전송했습니다.' } })
  }
}

const confirmEmailToken = async (req, res) => {
  const authServcie = new AuthService()
  const { token } = req
  try {
    await authServcie.saveIsAuthenticated(token)
    res.status(204).json({ data: { message: '이메일 인증이 완료되었습니다.' } })
  } catch (error) {
    console.log(error)
    res.status(401).json({ errorMessage: '이메일 인증에 실패하였습니다.' })
  }
}

const checkEmailAuth = async (req, res) => {
  const authServcie = new AuthService()
  const {
    query: { email }
  } = req
  try {
    const isAuthenticated = await authServcie.checkIsAuthenticatedByEmail(email)
    if (isAuthenticated) {
      res.status(200).json({ data: { message: '인증이 완료된 이메일입니다.' } })
    } else {
      res.status(401).json({ data: { message: '인증이 필요한 이메일입니다.' } })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  kakaoLogin,
  getAccessTokenByKakaoCode,
  kakaoSignup,
  localLogin,
  localSignup,
  logout,
  checkDuplicateLocalId,
  checkDuplicateName,
  checkValidEmail,
  confirmEmailToken,
  checkEmailAuth
}
