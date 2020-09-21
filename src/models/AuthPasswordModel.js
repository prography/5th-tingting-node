const AuthPassword = require('./entities/AuthPassword.entity')

class AuthPasswordModel {
  async saveAuthPassword (email, code) {
    await AuthPassword.create({
      authenticated_email: email,
      code
    })
  }

  async setIsAuthenticatedByCode (code) {
    await AuthPassword.update(
      {
        is_authenticated: 1
      },
      {
        where: {
          code
        }
      }
    )
  }

  async findAuthByCode (code) {
    const row = await AuthPassword.findOne({
      where: {
        code
      },
      raw: true
    })
    const auth = row || null
    return auth
  }
}

module.exports = AuthPasswordModel
