import Auth from './entities/Auth.entity'

class ModelAuth {
  async saveNameAndAuthenticatedEmail(name, email) {
    await Auth.create({
      user_name: name,
      authenticated_email: email
    })
  }

  async saveIsAuthenticated(email) {
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

  async findIsAuthenticatedByEmail(email) {
    const isAuthenticated = await Auth.findOne({
      where: {
        authenticated_email: email
      },
      attributes: ['is_authenticated']
    })
    return isAuthenticated
  }

  async findAuthenticatedEmailByEmail(email) {
    const authData = await Auth.findOne({
      where: {
        authenticated_email: email
      }
    })
    return authData
  }

  async findUserIdByName(name) {
    const authData = await Auth.findOne({
      where: {
        user_name: name
      }
    })
    return authData
  }
}

module.exports = ModelAuth
