const ProfileImg = require('./entities/ProfileImg.entity')

class ProfileImgModel {
  async findProfileImg (imgId) {
    const row = await ProfileImg.findOne({
      where: {
        id: imgId
      },
      raw: true
    })
    return row
  }

  async findProfileImgIdsByUserId (user_id) {
    const imgIds = await ProfileImg.findAll({
      attributes: ['id'],
      where: {
        user_id
      },
      raw: true
    })
    const idList = imgIds.map(x => x.id)
    return idList
  }

  async saveUserProfileImg (data) {
    await ProfileImg.create({
      url: data.profileImg,
      user_id: data.userId
    })
  }

  async updateUserProfileImg (data) {
    await ProfileImg.update(
      {
        url: data.profileImg
      },
      {
        where: {
          id: data.imgId,
          user_id: data.userId
        }
      })
  }

  async deleteUserProfileImg (data) {
    await ProfileImg.destroy({
      where: {
        id: data.imgId,
        user_id: data.userId
      }
    })
  }
}

module.exports = ProfileImgModel
