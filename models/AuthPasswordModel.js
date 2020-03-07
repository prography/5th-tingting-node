import AuthPassword from './entities/AuthPassword.entity'

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

  async findLastAuthByCode (code) {
    const rows = await AuthPassword.findAll({
      limit: 1,
      where: {
        code
      },
      order: [['created_at', 'DESC']],
      raw: true
    })
    const auth = rows ? null : rows
    return auth
  }
}

module.exports = AuthPasswordModel
