import User from './entities/User.entity'

class ModelUser {
  async saveUser(data) {
    await User.create({
      // To Do: parameter 수정 필요
      kakao_id: data.kakao_id,
      name: data.name,
      birth: data.birth,
      height: data.height,
      thumbnail: data.thumbnail,
      authenticated_address: data.authenticated_address,
      gender: data.gender,
      // created_at: '2019-12-26 05:16:14',
      updated_at: '2019-12-26 05:16:22'
    })
  }

  async findUserInfoById(id) {
    // To Do: parameter 수정 필요
    const userData = await User.findAll({
      where: {
        id
      }
    })
    console.log('mod_user :', userData)
    return userData
  }

  async findUserInfoByKaKaoId(kakao_id) {
    // To Do: parameter 수정 필요
    const userData = await User.findAll({
      where: {
        kakao_id
      }
    })
    console.log('mod_user :', userData)
    return userData
  }

  async updateUserInfo(data) {
    await User.update(
      {
        name: data.name,
        birth: data.birth,
        height: data.height,
        thumbnail: data.thumbnail
      },
      { where: { id: data.id } }
    )
  }

  async findUserIdByName(name) {
    const userId = await User.findOne({
      attributes: ['id'],
      where: {
        name
      }
    })
    return userId
  }
}
module.exports = ModelUser
