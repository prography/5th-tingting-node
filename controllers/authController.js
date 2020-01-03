const UserService = require('../services/UserService')
const AuthService = require('../services/AuthService')

// 카카오 회원가입
const kakaoSignup = async (req, res, next) => {
  const userService = new UserService()
  const authServcie = new AuthService()
  try {
    const schema = req.headers.authorization
    const accessToken = schema.replace('Bearer ', '')
    const kakaoId = await authServcie.getKakaoId(accessToken)
    const {
      body: { name, birth, height, thumbnail, authenticated_address, gender }
    } = req
    if (!kakaoId) {
      res.status(401).json({ errorMeesage: '유효하지 않은 토큰입니다.' })
    } else {
      const exUserId = await userService.findUserIdByKaKaoId(kakaoId)
      // findUserInfoByKakaoId 는 토큰을 점검하는 역할도 하기 때문에, 토큰이 유효하지 않은 경우에 대한 예외처리도 해줘야 해!! --> 이부분 잘 이해안감!

      if (exUserId) {
        res.status(403).json({ errorMessage: '이미 가입된 사용자입니다.' })
      } else {
        await userService.saveUser({
          kakao_id: kakaoId,
          name,
          birth,
          height,
          thumbnail,
          authenticated_address,
          gender
        })
        const id = await userService.findUserIdByKaKaoId(kakaoId)
        const token = authServcie.makeToken(id)
        console.log('Issued token: ', token)
        res
          .status(201)
          .json({ data: { message: '회원가입에 성공했습니다.' }, token })
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '회원가입에 실패했습니다.' })
  }
}

// 로컬 로그인
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
        res.status(202).json({
          data: { message: '로그인에 성공했습니다. & 토큰이 발행되었습니다.' },
          token
        })
      } else {
        res.status(401).json({
          errorMessage: '비밀번호가 틀렸습니다.'
        })
      }
    } else {
      res.status(400).json({
        errorMessage: '존재하지 않는 아이디입니다.'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      errorMessage: '로그인에 실패했습니다.'
    })
  }
}

// 로컬 회원가입
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
      res.status(400).json({ data: { message: '이미 가입된 사용자입니다.' } })
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
      const id = await userService.findUserIdByLocalId(local_id)
      const token = authServcie.makeToken(id)
      res
        .status(201)
        .json({ data: { message: '회원가입에 성공했습니다.' }, token })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ data: { message: '회원가입에 실패하였습니다.' } })
  }
}

// 로컬 아이디 중복 확인
const checkDuplicateLocalId = async (req, res) => {
  const authService = new AuthService()
  const {
    query: { local_id }
  } = req
  const isDuplicateLocalId = await authService.checkIsDuplicateLocalIdByLocalId(
    local_id
  )
  if (isDuplicateLocalId) {
    res.status(400).json({ errorMessage: '이미 존재하는 아이디입니다.' })
  } else {
    res.status(202).json({ data: { message: '사용 가능한 아이디입니다.' } })
  }
}

// 닉네임(이름) 중복 확인
const checkDuplicateName = async (req, res) => {
  const authService = new AuthService()
  const {
    query: { name }
  } = req
  const isDuplicateName = await authService.checkIsDuplicateNameByName(name)
  if (isDuplicateName) {
    res.status(400).json({ errorMessage: '이미 존재하는 이름입니다.' })
  } else {
    res.status(202).json({ data: { message: '사용 가능한 이름입니다.' } })
  }
}

// 가능한 이메일인지 확인
const checkValidEmail = async (req, res) => {
  const authService = new AuthService()
  const {
    body: { email, name }
  } = req
  const isValidSchool = await authService.findSchoolByEmail(email)
  const isDuplicateEmail = await authService.checkIsDuplicateAuthenticatedAddressByEmail(
    email
  )
  console.log('Duplicate: ', isDuplicateEmail)
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

// 이메일 토큰 확인
const confirmEmailToken = async (req, res) => {
  const authServcie = new AuthService()
  const { token } = req
  try {
    await authServcie.saveIsAuthenticated(token)
    res.status(201).json({ data: { message: '이메일 인증이 완료되었습니다.' } })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '이메일 인증에 실패하였습니다.' })
  }
}

// 이메일 인증 여부 재확인
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
  kakaoSignup,
  localLogin,
  localSignup,
  checkDuplicateLocalId,
  checkDuplicateName,
  checkValidEmail,
  confirmEmailToken,
  checkEmailAuth
}
