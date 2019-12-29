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

  async findUserInfoByKaKaoId (kakaorId) {
    // 임의로 추가됨
    try {
      const userInfo = await this.userModel.findUserInfoByKaKaoId(kakaorId)
      return userInfo
    } catch (error) {
      console.log(error)
    }
  }

  async saveUser (data) {
    try {
      await this.userModel.saveUser(data)
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
