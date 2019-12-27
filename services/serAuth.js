const jwt = require('jsonwebtoken')
const crypto = require('crypto')

class AuthService {
  //  constructor () {}

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
}

module.exports = AuthService
