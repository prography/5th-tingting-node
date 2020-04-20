const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const AvailableEmailModel = require('../models/AvailableEmailModel')
const AuthModel = require('../models/AuthModel')
const UserModel = require('../models/UserModel')
const AuthPasswordModel = require('../models/AuthPasswordModel')
const sendEmail = require('../utils/sendMail')
const pug = require('pug')
const path = require('path')
const axios = require('axios')

class AuthService {
  constructor () {
    this.availableEmailModel = new AvailableEmailModel()
    this.authModel = new AuthModel()
    this.userModel = new UserModel()
    this.authPasswordModel = new AuthPasswordModel()
  }

  async getKakaoId (accessToken) {
    try {
      const kakaoUserInfo = await axios({
        method: 'post',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      const kakaoId = kakaoUserInfo.data.id ? kakaoUserInfo.data.id : null
      // 유효하지 않은 토큰인 경우에 다양한 에러메시지를 전달해줌 -> 이걸 리턴해서 errorMessage에 띄워주는게 나으려나?
      //   {
      //     "msg": "this access token does not exist", //토큰 길이가 너무 길다 등등
      //     "code": -401
      //   }
      return kakaoId
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  makeToken (id) {
    const token = jwt.sign(
      {
        id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 365 * 24 * 60 * 60, // 1년
        issuer: 'tingting'
      }
    )
    return token
  }

  _makeEmailToken (email) {
    const token = jwt.sign(
      {
        email
      },
      process.env.JWT_SECRET_EMAIL,
      {
        expiresIn: 30 * 60, // 30분
        issuer: 'tingting'
      }
    )
    return token
  }

  makeCode (email) {
    const now = new Date()
    const salt = process.env.SALT
    const code = crypto
      .pbkdf2Sync(email + now, salt, 100000, 64, 'sha512')
      .toString('base64')
    return code
  }

  encryptPassword (password) {
    try {
      const salt = crypto.randomBytes(64).toString('base64')
      const encryptedPassword = crypto
        .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
        .toString('base64')
      const encryptInfo = {
        salt,
        encryptedPassword
      }
      return encryptInfo
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  verifyPassword (salt, password, passwordToVerify) {
    try {
      const encryptedPasswordToVerify = crypto
        .pbkdf2Sync(passwordToVerify, salt, 100000, 64, 'sha512')
        .toString('base64')
      if (encryptedPasswordToVerify === password) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async checkIsAuthenticatedByEmail (email) {
    try {
      const auth = await this.authModel.findLastAuthByEmail(email)
      const isAuthenticated = auth && auth.is_authenticated === 1
      return isAuthenticated
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async checkIsAuthenticatedByCodeForPassword (code) {
    try {
      const auth = await this.authPasswordModel.findAuthByCode(code)
      const isAuthenticated = auth && auth.is_authenticated === 1
      return isAuthenticated
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async checkValidityOfEmail (email) {
    try {
      const domain = email.split('@')[1] // 'hanyang.ac.kr'
      const school = await this.availableEmailModel.findSchoolByDomain(domain)
      const isValid = school && true
      return isValid
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async sendEmailToAuthenticateSchool (email) {
    try {
      const token = this._makeEmailToken(email)
      const subject = '[팅팅] 이메일 인증 요청'
      const authenticationUrl = process.env.HOST_BASE_URL + '/api/v1/auth//school/confirm?token=' + token
      const html = pug.renderFile(path.resolve(__dirname, '../public/templates/authMail.pug'), { authenticationUrl })
      sendEmail(email, subject, html)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async sendEmailToFindId (email, localId) {
    try {
      const subject = '[팅팅] 아이디 찾기'
      const html = pug.renderFile(path.resolve(__dirname, '../public/templates/findIdMail.pug'), { localId })
      sendEmail(email, subject, html)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async sendEmailToResetPassword (email, code) {
    try {
      const subject = '[팅팅] 비밀번호 재설정을 위한 인증 요청'
      const authenticationUrl = process.env.HOST_BASE_URL + '/api/v1/auth/find/password/confirm?code=' + code
      const html = pug.renderFile(path.resolve(__dirname, '../public/templates/resetPasswordMail.pug'), { authenticationUrl })
      sendEmail(email, subject, html)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async checkIsDuplicatedLocalId (localId) {
    try {
      const user = await this.userModel.findUserByLocalId(localId)
      const isDuplicated = user && true
      return isDuplicated
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async checkIsDuplicatedName (name) {
    try {
      const user = await this.userModel.findUserByName(name)
      const isDuplicated = user && true
      return isDuplicated
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async checkIsDuplicatedEmail (email) {
    try {
      const user = await this.userModel.findUserByAuthenticatedAddress(email)
      const isDuplicated = user && true
      return isDuplicated
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async saveAuthenticatedEmail (email) {
    try {
      await this.authModel.saveAuthenticatedEmail(email)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async saveAuthenticatedEmailAndCode (email, code) {
    try {
      await this.authPasswordModel.saveAuthPassword(email, code)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async setIsAuthenticatedOfAuth (token) {
    try {
      const { email } = token
      await this.authModel.setIsAuthenticatedByEmail(email)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async setIsAuthenticatedOfAuthToResetPassword (code) {
    try {
      await this.authPasswordModel.setIsAuthenticatedByCode(code)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async checkAge (userBirth) {
    var date = new Date()
    var year = date.getFullYear()
    var month = (date.getMonth() + 1)
    var day = date.getDate()
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    var monthDay = month + day

    userBirth = userBirth.replace('-', '').replace('-', '')
    var yearOfUserBirth = userBirth.substr(0, 4)
    var monthDayOfUserBirth = userBirth.substr(4, 4)

    var age = monthDay < monthDayOfUserBirth ? year - yearOfUserBirth - 1 : year - yearOfUserBirth
    return age
  }
}

module.exports = AuthService
