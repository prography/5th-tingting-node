const UserModel = require('../models/UserModel')
const AvailableEmailModel = require('../models/AvailableEmailModel')
const ProfileImgModel = require('../models/ProfileImgModel')
class UserService {
  constructor () {
    this.userModel = new UserModel()
    this.availableEmailModel = new AvailableEmailModel()
    this.profileImgModel = new ProfileImgModel()
  }

  async getUserInfo (userId) {
    try {
      const userInfo = await this.userModel.findUserInfo(userId)
      const email = userInfo.authenticated_address
      const domain = email.split('@')[1]
      const school = await this.availableEmailModel.findSchoolByDomain(domain)
      const schoolName = school.name
      userInfo.schoolName = schoolName
      const profileImgIds = await this.profileImgModel.findProfileImgIdsByUserId(userId)
      userInfo.profileImgIds = profileImgIds
      delete userInfo.authenticated_address
      userInfo.thumbnail = `https://api.tingting.kr/api/v1/users/${userId}/thumbnail-img`
      return userInfo
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findUserIdByKaKaoId (kakaoId) {
    try {
      const user = await this.userModel.findUserByKaKaoId(kakaoId)
      const userId = user ? user.id : null
      return userId
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findUserIdByLocalId (localId) {
    try {
      const user = await this.userModel.findUserByLocalId(localId)
      const userId = user ? user.id : null
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

  async findLocalIdByEmail (email) {
    try {
      const user = await this.userModel.findUserByEmail(email)
      const localId = user ? user.local_id : null
      return localId
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async findUserIdByLocalIdAndEmail (localId, email) {
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

  async saveUserByKakao (data) {
    try {
      await this.userModel.saveUserByKakao(data)
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
      throw new Error(error)
    }
  }

  async getUserThumbnailUrl (userId) {
    try {
      const user = await this.userModel.findUserInfo(userId)
      if (!user) return null
      return user.thumbnail
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async getUserProfileImgUrl (data) {
    const userId = data.userId
    const imgId = data.imgId
    try {
      const user = await this.userModel.findUserInfo(userId)
      if (!user) return null
      else {
        const profileImg = await this.profileImgModel.findProfileImg(imgId)
        return profileImg.url
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async updatePassword (email, encryptInfo) {
    try {
      await this.userModel.updatePasswordByEmail(email, encryptInfo)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
 
}

module.exports = UserService