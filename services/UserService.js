const UserModel = require('../models/UserModel')
const AvailableEmailModel = require('../models/AvailableEmailModel')

class UserService {
  constructor() {
    this.userModel = new UserModel()
    this.availableEmailModel = new AvailableEmailModel()
  }

  async getUserInfo(userId) {
    try {
      const userInfo = await this.userModel.findUserInfo(userId)
      const email = userInfo.authenticated_address
      const domain = email.split('@')[1]
      const school = await this.availableEmailModel.findSchoolByDomain(domain)
      const schoolName = school.name
      userInfo.schoolName = schoolName
      delete userInfo.authenticated_address
      return userInfo
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findUserIdByKaKaoId(kakaoId) {
    try {
      const user = await this.userModel.findUserByKaKaoId(kakaoId)
      const userId = user ? user.id : null
      return userId
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findUserIdByLocalId(localId) {
    try {
      const user = await this.userModel.findUserByLocalId(localId)
      const userId = user ? user.id : null
      return userId
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findAuthInfoByLocalId(localId) {
    try {
      const authInfo = await this.userModel.findAuthInfoByLocalId(localId)
      return authInfo
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findLocalIdByEmail(email) {
    try {
      const user = await this.userModel.findUserByEmail(email)
      const localId = user ? user.local_id : null
      return localId
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findUserByLocalIdAndEmail(localId, email) {
    try {
      const user = await this.userModel.findUserByLocalIdAndEmail(
        localId,
        email
      )
      const userId = user ? user.id : null
      return userId
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async saveUserByKakao(data) {
    try {
      await this.userModel.saveUserByKakao(data)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async saveUserByLocal(data) {
    try {
      await this.userModel.saveUserByLocal(data)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async updatePassword(id, encryptInfo) {
    try {
      await this.userModel.updatePassword(id, encryptInfo)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}

module.exports = UserService
