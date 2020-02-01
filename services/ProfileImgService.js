const ProfileImgModel = require('../models/ProfileImgModel')

class ProfileImgService {
  constructor () {
    this.profileImgModel = new ProfileImgModel()
  }

  async getProfileImgUrl (imgId) {
    try {
      const profileImg = await this.profileImgModel.findProfileImg(imgId)
      if (!profileImg) return null
      return profileImg.url
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}

module.exports = ProfileImgService
