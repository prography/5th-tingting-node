const UserModel = require('../models/UserModel')

class UserService {
  constructor () {
    this.userModel = new UserModel()
  }

  async getUserInfo (userId) {
    try {
      const userInfo = await this.userModel.findUserInfoById(userId)
      return userInfo
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findUserIdByKaKaoId (kakaoId) {
    try {
      const user = await this.userModel.findUserByKaKaoId(kakaoId)
      const userId = (user) ? user.id : null
      return userId
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findUserIdByLocalId (localId) {
    try {
      const user = await this.userModel.findUserByLocalId(localId)
      const userId = (user) ? user.id : null
      return userId
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findAuthInfoByLocalId (localId) {
    try {
      const authInfo = await this.userModel.findAuthInfoByLocalId(localId)
      return authInfo
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async saveUserByKakao (data) {
    try {
      await this.userModel.saveUserByKako(data)
    } catch (error) {
      console.log(error)
      throw new Error(error)
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

  async getUserGender (userId) {
    try {
      const userGender = await this.userModel.findUserGender(userId)
      return userGender
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = UserService
