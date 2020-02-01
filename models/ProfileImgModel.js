import ProfileImg from './entities/ProfileImg.entity'

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
}

module.exports = ProfileImgModel
