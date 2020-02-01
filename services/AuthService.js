const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const AvailableEmailModel = require('../models/AvailableEmailModel')
const AuthModel = require('../models/AuthModel.js')
const UserModel = require('../models/UserModel.js')
const fs = require('fs')
const path = require('path')
const axios = require('axios')

class AuthService {
  constructor() {
    this.availableEmailModel = new AvailableEmailModel()
    this.authModel = new AuthModel()
    this.userModel = new UserModel()
  }

  async getKakaoId(accessToken) {
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

  makeToken(id) {
    const token = jwt.sign(
      {
        id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 365 * 24 * 60 * 60 * 1000, // 1년
        issuer: 'tingting'
      }
    )
    return token
  }

  _makeEmailToken(email) {
    const token = jwt.sign(
      {
        email
      },
      process.env.JWT_SECRET_EMAIL,
      {
        expiresIn: 30 * 60 * 1000, // 30분
        issuer: 'tingting'
      }
    )
    return token
  }

  encryptPassword(password) {
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

  verifyPassword(salt, password, passwordToVerify) {
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

  async checkIsAuthenticatedByEmail(email) {
    try {
      const auth = await this.authModel.findLastAuthByEmail(email)
      const isAuthenticated = auth && auth.is_authenticated === 1
      return isAuthenticated
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async checkValidityOfEmail(email) {
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

  async sendEmail(email) {
    const mailConfig = {
      service: 'Naver',
      host: 'smtp.naver.com',
      port: 587,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      }
    }
    const html = fs.readFileSync(
      path.resolve(__dirname, '../public/html/authMail.html'),
      'utf8'
    )
    try {
      const token = this._makeEmailToken(email)
      const splitedHtml = html.split('token=')
      const finalHtml = splitedHtml[0] + 'token=' + token + splitedHtml[1]
      const message = {
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: '[팅팅] 이메일 인증 요청',
        html: finalHtml
      }
      const transporter = nodemailer.createTransport(mailConfig)
      transporter.sendMail(message)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async checkIsDuplicatedLocalId(localId) {
    try {
      const user = await this.userModel.findUserByLocalId(localId)
      const isDuplicated = user && true
      return isDuplicated
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async checkIsDuplicatedName(name) {
    try {
      const user = await this.userModel.findUserByName(name)
      const isDuplicated = user && true
      return isDuplicated
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async checkIsDuplicatedEmail(email) {
    try {
      const user = await this.userModel.findUserByAuthenticatedAddress(email)
      const isDuplicated = user && true
      return isDuplicated
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async saveAuthenticatedEmail(email) {
    try {
      await this.authModel.saveAuthenticatedEmail(email)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async setIsAuthenticatedOfAuth(token) {
    try {
      const { email } = token
      await this.authModel.setIsAuthenticatedByEmail(email)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}

module.exports = AuthService
