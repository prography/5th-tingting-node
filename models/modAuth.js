import Auth from './entities/Auth.entity'

class ModelAuth {
  async saveName(name) {
    await Auth.create({
      user_name: name
    })
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
