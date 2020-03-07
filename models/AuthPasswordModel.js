import AuthPassword from './entities/AuthPassword.entity'

class AuthPasswordModel {
  async saveAuthenticatedEmailAndCode (email, code) {
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
    return rows[0]
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
