const ModelUser = require('../models/modUser')

class serUser {
  constructor () {
    this.modUser = new ModelUser()
  }

  async findUserInfoById (userId) {
    try {
      const userInfo = await this.modUser.findUserInfoById(userId)
      return userInfo
    } catch (error) {
      console.log(error)
    }
  }

  async findUserInfoByKaKaoId (kakaorId) {
    // 임의로 추가됨
    try {
      const userInfo = await this.modUser.findUserInfoByKaKaoId(kakaorId)
      console.log('userInfo :', userInfo)
      return userInfo
    } catch (error) {
      console.log(error)
    }
  }

  async saveUser (data) {
    try {
      await this.modUser.saveUser(data)
    } catch (error) {
      console.log(error)
    }
  }

  async findUserIdByName (name) {
    try {
      const user = await this.modUser.findUserIdByName(name)
      return user.id
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = serUser
