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

  async findIsAuthenticatedByEmail (email) {
    const isAuthenticated = await Auth.findOne({
      where: {
        authenticated_email: email
      },
      attributes: ['is_authenticated']
    })
    return isAuthenticated
  }
}

module.exports = AuthModel
