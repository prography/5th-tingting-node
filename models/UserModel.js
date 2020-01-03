import User from './entities/User.entity'
// is deleted 추가
class UserModel {
  async saveUserByLocal(data) {
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

  async saveUserByKako(data) {
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

  async findUserInfoById(id) {
    // To Do: parameter 수정 필요// attributes: { exclude: ['baz'] } 적용?
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
        id,
        is_deleted: 0
      }
    })
    return userData
  }

  async findUserGenderById(id) {
    const gender = await User.findOne({
      where: {
        id
      },
      attributes: ['gender'],
      raw: true
    })
    return gender
  }

  async findUserIdByKaKaoId(kakao_id) {
    const userData = await User.findOne({
      where: {
        kakao_id
      },
      attributes: ['id'],
      raw: true
    })
    return userData
  }

  async findUserInfoByKaKaoId(kakao_id) {
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
        kakao_id,
        is_deleted: 0
      }
    })
    return userData
  }

  async findUserIdByLocalId(local_id) {
    const userId = await User.findOne({
      where: {
        local_id
      },
      attributes: ['id'],
      raw: true
    })
    return userId
  }

  async findLocalIdByLocalId(local_id) {
    const localId = await User.findOne({
      where: {
        local_id
      },
      attributes: ['local_id'],
      raw: true
    })
    return localId
  }

  async findAuthInfoByLocalId(local_id) {
    const authData = await User.findOne({
      where: {
        local_id
      },
      attributes: ['id', 'salt', 'password'],
      raw: true
    })
    return authData
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

  async findNameByName(name) {
    const ExistingName = await User.findOne({
      where: {
        name,
        is_deleted: 0
      },
      attributes: ['name']
    })
    return ExistingName
  }

  async findAuthenticatedAddressByEmail(email) {
    const ExistingEmail = await User.findOne({
      where: {
        authenticated_address: email,
        is_deleted: 0
      },
      attributes: ['authenticated_address']
    })
    return ExistingEmail
  }

  async findUserIdByName(name) {
    const userId = await User.findOne({
      attributes: ['id'],
      where: {
        name,
        is_deleted: 0
      }
    })
    return userId
  }

  async findUserGender(id) {
    const genderOfUser = await User.findOne({
      attributes: ['gender'],
      where: {
        id,
        is_deleted: 0
      }
    })
    return genderOfUser.dataValues.gender
  }
}
module.exports = UserModel
