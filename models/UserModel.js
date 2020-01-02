import User from './entities/User.entity'

class UserModel {
  async saveUserByLocal (data) {
    await User.create({
      local_id: data.local_id,
      password: data.password,
      salt: data.salt,
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
      attributes: [
        'name',
        'birth',
        'height',
        'thumbnail',
        'gender',
        'is_deleted'
      ],
      where: {
        id
      }
    })
    return userData
  }

  async findUserInfoByKaKaoId (kakao_id) {
    const userData = await User.findOne({
      where: {
        kakao_id
      }
    })
    return userData
  }

  async findUserIdByLocalId (local_id) {
    const userId = await User.findOne({
      where: {
        local_id
      },
      attributes: ['id'],
      raw: true
    })
    return userId
  }

  async findLocalIdByLocalId (local_id) {
    const localId = await User.findOne({
      where: {
        local_id
      },
      attributes: ['local_id'],
      raw: true
    })
    return localId
  }

  async findAuthInfoByLocalId (local_id) {
    const authData = await User.findOne({
      where: {
        local_id
      },
      attributes: ['id', 'salt', 'password'],
      raw: true
    })
    return authData
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
    const ExistingEmail = await User.findOne({
      where: {
        authenticated_address: email,
        is_deleted: 0
      },
      attributes: ['authenticated_address']
    })
    return ExistingEmail
  }

  async findUserIdByName (name) {
    const userId = await User.findOne({
      attributes: ['id'],
      where: {
        name
      }
    })
    return userId
  }
}
module.exports = UserModel