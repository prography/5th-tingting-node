const fs = require('fs')
const qs = require('qs')
const path = require('path')

const UserService = require('../services/UserService')
const MeService = require('../services/MeService')
const AuthService = require('../services/AuthService')

// 카카오 로그인 및 회원가입
const kakaoLogin = async (req, res) => {
  const userService = new UserService()
  const authService = new AuthService()
  try {
    const schema = req.headers.authorization
    const accessToken = schema.replace('Bearer ', '')
    const kakaoId = await authService.getKakaoId(accessToken)
    const {
      body: { name, birth, height, authenticated_address, gender }
    } = req
    if (!kakaoId) {
      const errorMessage = '유효하지 않은 토큰입니다.'
      console.log({ errorMessage })
      return res.status(401).json({ errorMessage })
    } else {
      const exUserId = await userService.findUserIdByKaKaoId(kakaoId)
      if (exUserId) {
        // 이미 로그인된 경우
        const token = authService.makeToken(exUserId)
        const data = { message: '로그인에 성공했습니다.', token }
        console.log(data)
        res.status(200).json({ data })
      } else {
        // 회원가입하는 경우
        const isAuthenticated = await authService.checkIsAuthenticatedByEmail(
          authenticated_address
        )
        if (!isAuthenticated) {
          const errorMessage = '인증된 이메일이 아닙니다.'
          console.log({ errorMessage })
          return res.status(401).json({ errorMessage })
        }
        const usersAge = await authService.checkAge(birth)
        if (usersAge >= 18) {
          await userService.saveUserByKakao({
            kakao_id: kakaoId,
            name,
            birth,
            height,
            authenticated_address,
            gender
          })
          const userId = await userService.findUserIdByKaKaoId(kakaoId)
          const token = authService.makeToken(userId)
          const data = {
            message: '회원가입에 성공했습니다. 이미지를 추가해주세요.',
            token
          }
          console.log(data)
          res.status(201).json({ data })
        }
        else {
          const errorMessage = '만 18세 미만으로 가입할 수 없습니다.'
          console.log({ errorMessage })
          return res.status(400).json({ errorMessage })
        }
      }
    }
  } catch (error) {
    const errorMessage = '로그인 혹은 회원가입에 실패했습니다.'
    console.log({ errorMessage })
    console.log(error)
    res.status(500).json({ errorMessage })
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
      const errorMessage = '아이디와 비밀번호를 입력해주세요!'
      console.log({ errorMessage })
      return res.status(400).json({ errorMessage })
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
        const data = {
          message: '로그인에 성공했습니다. & 토큰이 발행되었습니다.',
          token
        }
        console.log(data)
        res.status(200).json({ data })
      } else {
        const errorMessage = '비밀번호가 틀렸습니다.'
        console.log({ errorMessage })
        return res.status(401).json({ errorMessage })
      }
    } else {
      const errorMessage = '존재하지 않는 아이디입니다.'
      console.log({ errorMessage })
      return res.status(400).json({ errorMessage })
    }
  } catch (error) {
    const errorMessage = '로그인에 실패했습니다.'
    console.log({ errorMessage })
    console.log(error)
    return res.status(500).json({ errorMessage })
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
      authenticated_address,
      gender
    }
  } = req
  try {
    const exUserId = await userService.findUserIdByLocalId(local_id)
    if (exUserId) {
      const errorMessage = '이미 가입된 사용자입니다.'
      console.log({ errorMessage })
      return res.status(400).json({ errorMessage })
    } else {
      const encryptInfo = await authService.encryptPassword(password)
      const isAuthenticated = await authService.checkIsAuthenticatedByEmail(
        authenticated_address
      )
      if (!isAuthenticated) {
        const errorMessage = '인증된 이메일이 아닙니다.'
        console.log({ errorMessage })
        return res.status(401).json({ errorMessage })
      }
      const usersAge = await authService.checkAge(birth)
      if (usersAge >= 18) {
        await userService.saveUserByLocal({
          local_id,
          password: encryptInfo.encryptedPassword,
          salt: encryptInfo.salt,
          name,
          birth,
          height,
          authenticated_address,
          gender
        })
        const userId = await userService.findUserIdByLocalId(local_id)
        const token = authService.makeToken(userId)
        const data = {
          message: '회원가입에 성공했습니다. 이미지를 추가해주세요.',
          token
        }
        console.log(data)
        res.status(201).json({ data })
      } else {
        const errorMessage = '만 18세 미만으로 가입할 수 없습니다.'
        console.log({ errorMessage })
        return res.status(400).json({ errorMessage })
      }
    }
  } catch (error) {
    const errorMessage = '회원가입에 실패하였습니다.'
    console.log({ errorMessage })
    console.log(error)
    return res.status(500).json({ errorMessage })
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
    const errorMessage = '이미 존재하는 아이디입니다.'
    console.log({ errorMessage })
    res.status(400).json({ errorMessage })
  } else {
    const data = { message: '사용 가능한 아이디입니다.' }
    console.log(data)
    res.status(200).json({ data })
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
    const errorMessage = '이미 존재하는 이름입니다.'
    console.log({ errorMessage })
    res.status(400).json({ errorMessage })
  } else {
    const data = { message: '사용 가능한 이름입니다.' }
    console.log(data)
    res.status(200).json({ data })
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
      const errorMessage = '이미 가입된 이메일입니다.'
      console.log({ errorMessage })
      res.status(400).json({ errorMessage })
    } else if (!isValid) {
      const errorMessage = '가입이 불가능한 이메일입니다.'
      console.log({ errorMessage })
      res.status(401).json({ errorMessage })
    } else {
      await authService.saveAuthenticatedEmail(email)
      await authService.sendEmail(email)
      const data = { message: '인증메일을 전송했습니다.' }
      console.log(data)
      res.status(201).json({ data })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
  }
}

// 이메일 토큰 확인
const confirmEmailToken = async (req, res) => {
  const authService = new AuthService()
  const { token } = req
  try {
    await authService.setIsAuthenticatedOfAuth(token)
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
  const authService = new AuthService()
  const {
    query: { email }
  } = req
  try {
    const isAuthenticated = await authService.checkIsAuthenticatedByEmail(email)
    if (isAuthenticated) {
      const data = { message: '인증이 완료된 이메일입니다.' }
      console.log(data)
      res.status(200).json({ data })
    } else {
      const errorMessage = '인증이 필요한 이메일입니다.'
      console.log({ errorMessage })
      res.status(401).json({ errorMessage })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
  }
}

const uploadThumbnail = async (req, res) => {
  const meService = new MeService()
  const thumbnail = req.file.key
  const userId = req.token.id
  try {
    await meService.saveMyThumbnail({ thumbnail, userId })
    const data = { message: '이미지 저장에 성공하였습니다.' }
    console.log(data)
    res.status(201).json({ data })
  } catch (error) {
    const errorMessage = '이미지 저장에 실패하였습니다.'
    console.log({ errorMessage })
    console.log(error)
    res.status(500).json({ errorMessage })
  }
}

// 아이디 찾기
const checkValidityForIdAndSendEmail = async (req, res) => {
  const userService = new UserService()
  const authService = new AuthService()
  const {
    body: { email }
  } = req
  try {
    const localId = await userService.findLocalIdByEmail(email)
    if (!localId) {
      const errorMessage = '존재하지 않는 이메일입니다.'
      console.log({ errorMessage })
      res.status(400).json({ errorMessage })
    } else {
      await authService.sendEmailToFindId(email, localId)
      const data = { message: '아이디 찾기 메일을 전송했습니다.' }
      console.log(data)
      res.status(200).json({ data })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
  }
}

// 비밀번호 찾기 - 유저 존재 여부
const checkValidityForPasswordAndSendEmail = async (req, res) => {
  const userService = new UserService()
  const authService = new AuthService()
  const {
    body: { localId, email }
  } = req
  try {
    const exUserId = await userService.findUserIdByLocalIdAndEmail(localId, email)
    if (!exUserId) {
      const errorMessage = '잘못된 아이디 또는 이메일입니다.'
      console.log({ errorMessage })
      res.status(400).json({ errorMessage })
    } else {
      const code = authService.makeCode(email)
      await authService.saveAuthenticatedEmailAndCode(email, code)
      await authService.sendEmailToResetPassword(email, code)
      const data = { code }
      console.log(data)
      res.status(201).json({ data })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
  }
}

const confirmEmailCodeForPassword = async (req, res) => {
  const authService = new AuthService()
  const query = req._parsedUrl.query
  const code = query.substr(5)
  try {
    await authService.setIsAuthenticatedOfAuthToResetPassword(code)
    const confirmPassword = fs.readFileSync(
      path.resolve(__dirname, '../public/html/confirmPassword.html'),
      'utf8'
    )
    res.send(confirmPassword)
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
  }
}

const checkEmailAuthForPassword = async (req, res) => {
  const authService = new AuthService()
  const code = req.headers.authorization
  try {
    const isAuthenticated = await authService.checkIsAuthenticatedByCodeForPassword(code)
    if (isAuthenticated) {
      const data = { message: '인증이 완료된 이메일입니다.' }
      console.log(data)
      res.status(200).json({ data })
    } else {
      const errorMessage = '인증이 필요한 이메일입니다.'
      console.log({ errorMessage })
      res.status(401).json({ errorMessage })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
  }
}

// 비밀번호 찾기 - 비밀번호 재설정
const resetPassword = async (req, res) => {
  const userService = new UserService()
  const authService = new AuthService()
  const code = req.headers.authorization
  const {
    body: { password, email }
  } = req
  try {
    if (code) {
      const isAuthenticated = await authService.checkIsAuthenticatedByCodeForPassword(code)
      if (isAuthenticated) {
        const encryptInfo = await authService.encryptPassword(password)
        await userService.updatePassword(email, encryptInfo)
        const data = { message: '비밀번호를 재설정하였습니다.' }
        console.log(data)
        return res.status(200).json({ data })
      }
    }
    const errorMessage = '인증이 필요한 이메일입니다.'
    console.log({ errorMessage })
    res.status(401).json({ errorMessage })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
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
  uploadThumbnail,
  checkValidityForIdAndSendEmail,
  checkValidityForPasswordAndSendEmail,
  confirmEmailCodeForPassword,
  checkEmailAuthForPassword,
  resetPassword
}

