import Auth from './entities/Auth.entity'

class AuthModel {
  async saveNameAndAuthenticatedEmail (name, email) {
    await Auth.create({
      user_name: name,
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
      order: [['created_at', 'DESC']]
    })
    return rows[0]
  }
}

module.exports = AuthModel
