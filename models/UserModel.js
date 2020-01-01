import User from './entities/User.entity'
// is deleted 추가
class UserModel {
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
    // To Do: parameter 수정 필요// attributes: { exclude: ['baz'] } 적용?
    const userData = await User.findAll({
      attributes: ['name', 'birth', 'height', 'thumbnail', 'gender', 'is_deleted'],
      where: {
        id,
        is_deleted: 0
      }
    })
    return userData
  }

  async findUserInfoByKaKaoId (kakao_id) {
    // To Do: parameter 수정 필요
    const userData = await User.findAll({
      attributes: ['name', 'birth', 'height', 'thumbnail', 'gender', 'is_deleted'],
      where: {
        kakao_id,
        is_deleted: 0
      }
    })
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
        name,
        is_deleted: 0
      }
    })
    return userId
  }

  async findUserGender (id) {
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
