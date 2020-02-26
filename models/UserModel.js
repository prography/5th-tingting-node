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
      authenticated_address: data.authenticated_address,
      gender: data.gender
    })
  }

  async saveUserByKakao (data) {
    await User.create({
      kakao_id: data.kakao_id,
      name: data.name,
      birth: data.birth,
      height: data.height,
      authenticated_address: data.authenticated_address,
      gender: data.gender
    })
  }

  async findUserInfo (id) {
    // attributes: { exclude: ['baz'] } 적용?
    const user = await User.findOne({
      attributes: [
        'id',
        'name',
        'birth',
        'height',
        'thumbnail',
        'gender',
        'authenticated_address'
      ],
      where: {
        id,
        is_deleted: 0
      },
      raw: true
    })
    return user
  }

  async findUserByKaKaoId (kakao_id) {
    const user = await User.findOne({
      where: {
        kakao_id,
        is_deleted: 0
      },
      raw: true
    })
    return user
  }

  async findUserByLocalId (local_id) {
    const user = await User.findOne({
      where: {
        local_id,
        is_deleted: 0
      },
      raw: true
    })
    return user
  }

  async findUserByName (name) {
    const user = await User.findOne({
      where: {
        name,
        is_deleted: 0
      },
      raw: true
    })
    return user
  }

  async findAuthInfoByLocalId (local_id) {
    const authInfo = await User.findOne({
      where: {
        local_id,
        is_deleted: 0
      },
      attributes: ['id', 'salt', 'password'],
      raw: true
    })
    return authInfo
  }

  async findUserByEmail (email) {
    const row = await User.findOne({
      where: {
        authenticated_address: email,
        is_deleted: 0
      },
      raw: true
    })
    return row
  }

  async findUserByLocalIdAndEmail (local_id, email) {
    const user = await User.findOne({
      where: {
        local_id,
        authenticated_address: email,
        is_deleted: 0
      },
      raw: true
    })
    return user
  }

  async updateUserInfo (data) {
    await User.update(
      {
        height: data.height,
      },
      { where: { id: data.userId } }
    )
  }

  async updatePassword (email, encryptInfo) {
    await User.update(
      {
        password: encryptInfo.encryptedPassword,
        salt: encryptInfo.salt
      },
      {
        where: {
          authenticated_address: email
        }
      }
    )
  }

  async findUserByAuthenticatedAddress (authenticatedAddress) {
    const row = await User.findOne({
      where: {
        authenticated_address: authenticatedAddress,
        is_deleted: 0
      },
      raw: true
    })
    return row
  }

  async updateUserThumbnail (data) {
    await User.update(
      {
        thumbnail: data.thumbnail
      },
      { where: { id: data.userId } }
    )
  }
}

module.exports = UserModel
