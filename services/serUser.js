const ModelTeam = require('../models/modTeam')
const ModelBelong = require('../models/modBelong')
const ModelUser = require('../models/modUser')
const ModelMatching = require('../models/modMatching')

class serUser {
  constructor () {
    this.modUser = new ModelUser()
    this.modTeam = new ModelTeam()
    this.modBelong = new ModelBelong()
    this.modMatching = new ModelMatching()
  }

  // 나의 개별 팀 찾기
  async findMyTeamList (userId) {
    try {
      const teamListOwner = await this.modTeam.findMyTeamList(userId).then()
      const teamListId = await this.modBelong.findMyTeamList(userId).then()
      const teamList = teamListOwner.concat(teamListId)
      // console.log('teamList', teamList);
      return teamList
    } catch (error) {
      console.log(error)
    }
  }

  async findUserInfoById (userId) {
    try {
      const userInfo = await this.modUser.findUserInfoById(userId)
      console.log('userInfo :', userInfo)
      return userInfo
    } catch (error) {
      console.log(error)
    }
  }

  async findUserInfoByKaKaoId (kakaorId) {
    // 임의로 추가됨
    try {
      const userInfo = await this.modUser.findUserInfoByKaKaoId(kakaorId)
      console.log('userInfo :', userInfo)
      return userInfo
    } catch (error) {
      console.log(error)
    }
  }

  async saveUser (data) {
    try {
      await this.modUser.saveUser(data)
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = serUser
