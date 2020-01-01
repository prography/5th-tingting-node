const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const AvailableEmailModel = require('../models/AvailableEmailModel')
const AuthModel = require('../models/AuthModel.js')
const UserModel = require('../models/UserModel.js')
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const qs = require('querystring')

class AuthService {
  constructor () {
    this.availableEmailModel = new AvailableEmailModel()
    this.authModel = new AuthModel()
    this.userModel = new UserModel()
  }

  makeUserConsentURL () {
    const clientId = process.env.KAKAO_CLIENTID
    const redirectUri = process.env.KAKAO_REDIRECTURI
    const userConsentUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`
    return userConsentUrl
  }

  async getAccessToken (code) {
    try {
      const tokenInfo = await axios({
        method: 'post',
        url: 'https://kauth.kakao.com/oauth/token',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_CLIENTID,
          redirect_uri: process.env.KAKAO_REDIRECTURI,
          code,
          client_secret: process.env.KAKAO_CLIENTSECRET
        })
      })
      return tokenInfo.data.access_token
    } catch (error) {
      console.log(error)
    }
  }

  async getKakaoId (accessToken) {
    try {
      const userInfo = await axios({
        method: 'post',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      return userInfo.data.id
    } catch (error) {
      console.log(error)
    }
  }

  makeToken (userInfo) {
    const token = jwt.sign(
      {
        id: userInfo[0].dataValues.id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 1000, // 1시간
        issuer: 'tingting'
      }
    )
    return token
  }

  makeEmailToken (email) {
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

  async findSchoolByEmail (email) {
    try {
      const domain = email.split('@')[1] // 'hanyang.ac.kr'
      const school = await this.availableEmailModel.findSchoolByDomain(domain)
      return school
    } catch (error) {
      console.log(error)
    }
  }

  async sendEmail (email) {
    const mailConfig = {
      service: 'Naver',
      host: 'smtp.naver.com',
      port: 587,
      auth: {
        user: process.env.EMAIL_USEREMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    }
    const html = fs.readFileSync(
      path.resolve(__dirname, 'authMail.html'),
      'utf8'
    )
    try {
      const token = this.makeEmailToken(email)
      const splitHtml = html.split('token=')
      const htmlEnd = splitHtml[0] + 'token=' + token + splitHtml[1]
      console.log(token)
      const message = {
        from: process.env.EMAIL_USEREMAIL,
        to: email,
        subject: '[팅팅] 이메일 인증 요청',
        html: htmlEnd
      }
      const transporter = nodemailer.createTransport(mailConfig)
      transporter.sendMail(message)
    } catch (error) {
      console.log(error)
    }
  }

  async findExistingNameByName (name) {
    try {
      const existingName = await this.userModel.findNameByName(name)
      return existingName
    } catch (error) {
      console.log(error)
    }
  }

  async findExistingAuthenticatedAddressByEmail (email) {
    try {
      const ExistingEmail = await this.userModel.findAuthenticatedAddressByEmail(
        email
      )
      return ExistingEmail
    } catch (error) {
      console.log(error)
    }
  }

  async saveNameAndAuthenticatedEmail (name, email) {
    try {
      await this.authModel.saveNameAndAuthenticatedEmail(name, email)
    } catch (error) {
      console.log(error)
    }
  }

  async saveIsAuthenticated (token) {
    try {
      const { email } = token
      await this.authModel.saveIsAuthenticated(email)
    } catch (error) {
      console.log(error)
    }
  }

  async checkIsAuthenticatedByEmail (email) {
    try {
      const isAuthenticated = await this.authModel.findIsAuthenticatedByEmail(
        email
      )
      return isAuthenticated
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = AuthService
