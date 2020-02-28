import AuthPassword from './entities/AuthPassword.entity'

class AuthPasswordModel {
  async saveAuthenticatedEmail (email) {
    await AuthPassword.create({
      authenticated_email: email
    })
  }

  async setIsAuthenticatedByEmail (email) {
    await AuthPassword.update(
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
    const rows = await AuthPassword.findAll({
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

module.exports = AuthPasswordModel