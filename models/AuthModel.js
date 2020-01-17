import Auth from './entities/Auth.entity'

class AuthModel {
  async saveAuthenticatedEmail (email) {
    await Auth.create({
      authenticated_email: email
    })
  }

  async setIsAuthenticatedByEmail (email) {
    await Auth.update(
      {
        is_authenticated: 1
      },
      {
        where: {
          authenticated_email: email
        }
      }
    )
  }

  async findLastAuthByEmail (email) {
    const rows = await Auth.findAll({
      limit: 1,
      where: {
        authenticated_email: email
      },
      order: [['created_at', 'DESC']],
      raw: true
    })
    return rows[0]
  }
}

module.exports = AuthModel
