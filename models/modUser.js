import User from './entities/User.entity'

class ModelUser {
  async saveUser (data) {
    await User.create({
      kakao_id: data.kakao_id,
      name: data.name,
      birth: data.birth,
      height: data.height,
      thumbnail: data.thumbnail,
      authenticated_address: data.authenticated_address,
      gender: data.gender
    })
  }

  async findUserInfoById (id) {
    // To Do: parameter 수정 필요
    const userData = await User.findAll({
      where: {
        id
      }
    })
    console.log('mod_user :', userData)
    return userData
  }

  async findUserInfoByKaKaoId (kakao_id) {
    // To Do: parameter 수정 필요
    const userData = await User.findAll({
      where: {
        kakao_id
      }
    })
    console.log('mod_user :', userData)
    return userData
  }

  async updateUserInfo (data) {
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

  async findNameByName (name) {
    const ExistingName = await User.findOne({
      where: {
        name,
        is_deleted: 0
      },
      attributes: ['name']
    })
    return ExistingName
  }

  async findAuthenticatedAddressByEmail (email) {
    console.log(email)
    const ExistingEmail = await User.findOne({
      where: {
        authenticated_address: email,
        is_deleted: 0
      },
      attributes: ['authenticated_address']
    })
    return ExistingEmail
    console.log(ExistingEmail)
  }
}
module.exports = ModelUser
