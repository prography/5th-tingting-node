const Auth = require('./entities/Auth.entity')

class AuthModel {
  async saveAuthenticatedEmail (email) {
    await Auth.create({
      authenticated_address: email
    })
  }

  async setIsAuthenticatedByEmail (email) {
    await Auth.update(
      {
        is_authenticated: 1
      },
      {
        where: {
          authenticated_address: email
        }
      }
    )
  }

  async findLastAuthByEmail (email) {
    const rows = await Auth.findAll({
      limit: 1,
      where: {
        authenticated_address: email
      },
      order: [['created_at', 'DESC']],
      raw: true
    })
    return rows[0]
  }
}

module.exports = AuthModel
