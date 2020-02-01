const fs = require('fs')
const path = require('path')

const UserService = require('../services/UserService')
const AuthService = require('../services/AuthService')

// 카카오 로그인 및 회원가입
const kakaoLogin = async (req, res, next) => {
  const userService = new UserService()
  const authService = new AuthService()
  try {
    const schema = req.headers.authorization
    const accessToken = schema.replace('Bearer ', '')
    const kakaoId = await authService.getKakaoId(accessToken)
    const {
      body: { name, birth, height, thumbnail, authenticated_address, gender }
    } = req
    if (!kakaoId) {
      res.status(401).json({ errorMeesage: '유효하지 않은 토큰입니다.' })
    } else {
      const exUserId = await userService.findUserIdByKaKaoId(kakaoId)
      if (exUserId) {
        // 이미 로그인된 경우
        const token = authService.makeToken(exUserId)
        res
          .status(200)
          .json({ data: { message: '로그인에 성공했습니다.', token } })
      } else {
        // 회원가입하는 경우
        const isAuthenticated = await authService.checkIsAuthenticatedByEmail(
          authenticated_address
        )
        if (!isAuthenticated) {
          return res
            .status(401)
            .json({ errorMessage: '인증된 이메일이 아닙니다.' })
        }
        //upload
        await userService.saveUserByKakao({
          kakao_id: kakaoId,
          name,
          birth,
          height,
          thumbnail,
          authenticated_address,
          gender
        })
        const userId = await userService.findUserIdByKaKaoId(kakaoId)
        const token = authService.makeToken(userId)
        res
          .status(201)
          .json({ data: { message: '회원가입에 성공했습니다.', token } })
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: '로그인 혹은 회원가입에 실패했습니다.' })
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
    if (!local_id || !password) {
      return res.status(400).json({
        errorMessage: '아이디와 비밀번호를 입력해주세요!'
      })
    }
    const authInfo = await userService.findAuthInfoByLocalId(local_id)
    if (authInfo) {
      // local_id, password 일치 확인
      const isCorrectPassword = authService.verifyPassword(
        authInfo.salt,
        authInfo.password,
        password
      )
      if (isCorrectPassword) {
        const token = authService.makeToken(authInfo.id)
        next()
        res.status(200).json({
          data: {
            message: '로그인에 성공했습니다. & 토큰이 발행되었습니다.',
            token
          }
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
    res.status(500).json({
      errorMessage: '로그인에 실패했습니다.'
    })
  }
}

// 로컬 회원가입
const localSignup = async (req, res, next) => {
  const userService = new UserService()
  const authService = new AuthService()
  const {
    body: {
      local_id,
      password,
      name,
      birth,
      height,
      authenticated_address,
      gender
    }
  } = req
  try {
    const exUserId = await userService.findUserIdByLocalId(local_id)
    if (exUserId) {
      return res
        .status(400)
        .json({ data: { message: '이미 가입된 사용자입니다.' } })
    } else {
      const encryptInfo = await authService.encryptPassword(password)
      const isAuthenticated = await authService.checkIsAuthenticatedByEmail(
        authenticated_address
      )
      if (!isAuthenticated) {
        return res
          .status(401)
          .json({ errorMessage: '인증된 이메일이 아닙니다.' })
      }
      const token = authService.makeToken(local_id)
      res
        .status(201)
        .json({ data: { message: '회원인증에 성공했습니다 -- thumbnail로 가세요', token } })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ data: { message: '회원인증에 실패하였습니다.' } })
  }
}

// 로컬 아이디 중복 확인
const checkDuplicateLocalId = async (req, res) => {
  const authService = new AuthService()
  const {
    query: { local_id }
  } = req
  const isDuplicatedLocalId = await authService.checkIsDuplicatedLocalId(
    local_id
  )
  if (isDuplicatedLocalId) {
    res.status(400).json({ errorMessage: '이미 존재하는 아이디입니다.' })
  } else {
    res.status(200).json({ data: { message: '사용 가능한 아이디입니다.' } })
  }
}

// 닉네임(이름) 중복 확인
const checkDuplicateName = async (req, res) => {
  const authService = new AuthService()
  const {
    query: { name }
  } = req
  const isDuplicatedName = await authService.checkIsDuplicatedName(name)
  if (isDuplicatedName) {
    res.status(400).json({ errorMessage: '이미 존재하는 이름입니다.' })
  } else {
    res.status(200).json({ data: { message: '사용 가능한 이름입니다.' } })
  }
}

// 유효한 이메일인지 체크하고, 확인 메일 전송.
const checkValidityAndSendEmail = async (req, res) => {
  const authService = new AuthService()
  const {
    body: { email }
  } = req
  try {
    const isValid = await authService.checkValidityOfEmail(email)
    const isDuplicated = await authService.checkIsDuplicatedEmail(email)
    if (isDuplicated) {
      res.status(400).json({ errorMessage: '이미 가입된 이메일입니다.' })
    } else if (!isValid) {
      res.status(401).json({ errorMessage: '가입이 불가능한 이메일입니다.' })
    } else {
      await authService.saveAuthenticatedEmail(email)
      await authService.sendEmail(email)
      res.status(201).json({ data: { message: '인증메일을 전송했습니다.' } })
    }
  } catch (err) {
    res.status(500).json({ errMessage: '서버 에러' })
  }
}

// 이메일 토큰 확인
const confirmEmailToken = async (req, res) => {
  const authServcie = new AuthService()
  const { token } = req
  try {
    await authServcie.setIsAuthenticatedOfAuth(token)
    const confirmSchool = fs.readFileSync(
      path.resolve(__dirname, '../public/html/confirmSchool.html'),
      'utf8'
    )
    res.send(confirmSchool)
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
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
      res.status(401).json({ errorMessage: '인증이 필요한 이메일입니다.' })
    }
  } catch (error) {
    res.status(500).json({ errorMessage: '서버 에러!' })
  }
}

const uploadThumbnail = async (req, res) =>{
  try{
    const { token } = req
    const thumbnail = req.file.location // 바꾸기 key로 
    const {
      body: {
        local_id,
        password,
        name,
        birth,
        height,
        authenticated_address,
        gender
      }
    } = req

    if (local_id.length !== 0){
    await userService.saveUserByLocal({
      local_id,
      password: encryptInfo.encryptedPassword,
      salt: encryptInfo.salt,
      name,
      birth,
      height,
      thumbnail,
      authenticated_address,
      gender
    })
    const userId = await userService.findUserIdByLocalId(local_id)
    const token = authService.makeToken(userId)
    res
      .status(201)
      .json({ data: { message: 'local 회원가입에 성공했습니다.', token } })
  }
      //kakao
  }catch (error) {
    console.log(error)
    res.status(500).json({ data: { message: '회원가입에 실패하였습니다.' } })
  }
}

module.exports = {
  kakaoLogin,
  localLogin,
  localSignup,
  checkDuplicateLocalId,
  checkDuplicateName,
  checkValidityAndSendEmail,
  confirmEmailToken,
  checkEmailAuth,
  uploadThumbnail
}
