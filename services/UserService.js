const UserModel = require('../models/UserModel')

class UserService {
  constructor () {
    this.userModel = new UserModel()
  }

  async findUserInfoById (userId) {
    try {
      const userInfo = await this.userModel.findUserInfoById(userId)
      return userInfo
    } catch (error) {
      console.log(error)
    }
  }

  async findUserInfoByKaKaoId (kakaoId) {
    try {
      const userInfo = await this.userModel.findUserInfoByKaKaoId(kakaoId)
      return userInfo
    } catch (error) {
      console.log(error)
    }
  }

  async findUserIdByLocalId (localId) {
    try {
      const userInfo = await this.userModel.findUserIdByLocalId(localId)
      return userInfo
    } catch (error) {
      console.log(error)
    }
  }

  async findAuthInfoByLocalId (localId) {
    try {
      const authInfo = await this.userModel.findAuthInfoByLocalId(localId)
      return authInfo
    } catch (error) {
      console.log(error)
    }
  }

  async saveUserByLocal (data) {
    try {
      await this.userModel.saveUserByLocal(data)
    } catch (error) {
      console.log(error)
    }
  }

  async findUserIdByName (name) {
    try {
      const user = await this.userModel.findUserIdByName(name)
      return user.id
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = UserService
