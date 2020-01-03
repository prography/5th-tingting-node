import User from './entities/User.entity'

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

<<<<<<< HEAD
  async findUserInfo (id) {
=======
  async findUserInfoById(id) {
>>>>>>> 토큰 수정 및 createTaem
    // To Do: parameter 수정 필요// attributes: { exclude: ['baz'] } 적용?
    const user = await User.findOne({
      attributes: [
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
<<<<<<< HEAD
=======
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
>>>>>>> 토큰 수정 및 createTaem
      },
      raw: true
    })
    return user
  }

<<<<<<< HEAD
  async findUserByKaKaoId (kakao_id) {
    const user = await User.findOne({
=======
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
>>>>>>> 토큰 수정 및 createTaem
      where: {
        kakao_id,
        is_deleted: 0
      },
      raw: true
    })
    return user
  }

<<<<<<< HEAD
  async findUserByLocalId (local_id) {
    const user = await User.findOne({
=======
  async findUserIdByLocalId(local_id) {
    const userId = await User.findOne({
>>>>>>> 토큰 수정 및 createTaem
      where: {
        local_id,
        is_deleted: 0
      },
      raw: true
    })
    return user
  }

<<<<<<< HEAD
  async findUserByName (name) {
    const user = await User.findOne({
=======
  async findLocalIdByLocalId(local_id) {
    const localId = await User.findOne({
>>>>>>> 토큰 수정 및 createTaem
      where: {
        name,
        is_deleted: 0
      },
      raw: true
    })
    return user
  }

<<<<<<< HEAD
  async findAuthInfoByLocalId (local_id) {
    const authInfo = await User.findOne({
=======
  async findAuthInfoByLocalId(local_id) {
    const authData = await User.findOne({
>>>>>>> 토큰 수정 및 createTaem
      where: {
        local_id,
        is_deleted: 0
      },
      attributes: ['id', 'salt', 'password'],
      raw: true
    })
    return authInfo
  }

  async updateUserInfo(data) {
    await User.update(
      {
        height: data.height,
        thumbnail: data.thumbnail
      },
      { where: { id: data.userId } }
    )
  }

<<<<<<< HEAD
  async findUserByAuthenticatedAddress (authenticatedAddress) {
    const row = await User.findOne({
=======
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
>>>>>>> 토큰 수정 및 createTaem
      where: {
        authenticated_address: authenticatedAddress,
        is_deleted: 0
      },
<<<<<<< HEAD
      raw: true
=======
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
>>>>>>> 토큰 수정 및 createTaem
    })
    return row
  }

  async findUserGender(id) {
    const genderOfUser = await User.findOne({
      attributes: ['gender'],
      where: {
        id,
        is_deleted: 0
      },
      raw: true
    })
    return genderOfUser.gender
  }
}

module.exports = UserModel
