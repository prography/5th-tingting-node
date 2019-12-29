const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const ModelAvailableEmail = require('../models/modAvailableEmail')
const ModelAuth = require('../models/modAuth.js')
const fs = require('fs')
const path = require('path')

class AuthService {
  constructor() {
    this.modAvailableEmail = new ModelAvailableEmail()
    this.modAuth = new ModelAuth()
  }

  makeToken(userInfo) {
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

  makeEmailToken(email) {
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

  async findSchoolByEmail(email) {
    try {
      const domain = email.split('@')[1] // 'hanyang.ac.kr'
      const school = await this.modAvailableEmail.findSchoolByDomain(domain)
      return school
    } catch (error) {
      console.log(error)
    }
  }

  async sendEmail(email) {
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
        subject: '[tingting] 이메일 인증 요청',
        html: htmlEnd
      }
      const transporter = nodemailer.createTransport(mailConfig)
      transporter.sendMail(message)
    } catch (error) {
      console.log(error)
    }
  }

  async saveNameAndAuthenticatedEmail(name, email) {
    try {
      await this.modAuth.saveNameAndAuthenticatedEmail(name, email)
    } catch (error) {
      console.log(error)
    }
  }

  async saveIsAuthenticated(token) {
    try {
      const { email } = token
      await this.modAuth.saveIsAuthenticated(email)
    } catch (error) {
      console.log(error)
    }
  }

  async checkIsAuthenticatedByEmail(email) {
    try {
      const isAuthenticated = await this.modAuth.findIsAuthenticatedByEmail(
        email
      )
      return isAuthenticated
    } catch (error) {
      console.log(error)
    }
  }

  async findAuthenticatedEmailByEmail(email) {
    try {
      const authData = await this.modAuth.findAuthenticatedEmailByEmail(email)
      return authData
    } catch (error) {
      console.log(error)
    }
  }

  async findUserNameByName(name) {
    try {
      const authData = await this.modAuth.findUserIdByName(name)
      return authData
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = AuthService
