const TeamModel = require('../models/TeamModel')
const BelongModel = require('../models/BelongModel')
const UserModel = require('../models/UserModel')

class TeamService {
  constructor () {
    this.teamModel = new TeamModel()
    this.belongModel = new BelongModel()
    this.userModel = new UserModel()
  }

  async saveTeam (data) {
    try {
      await this.teamModel.saveTeam(data)
    } catch (error) {
      console.log(error)
    }
  }

  async checkIsDuplicateTeamNameByName (name) {
    try {
      const teamName = await this.teamModel.findNameByName(name)
      if (teamName) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
    }
  }

  async findAllTeamListWithoutMe (userId, userGender) {
    try {
      const ListIsNotOwner = await this.teamModel.findTeamListIsNotOwner(
        userId,
        userGender
      )
      const ListIsBelong = await this.belongModel.findMyTeamList(userId)
      const teamList = ListIsNotOwner.filter(
        list => !ListIsBelong.includes(list)
      )
      return teamList
    } catch (error) {
      console.log(error)
    }
  }

  async findTeamInfo (teamId) {
    try {
      const teamInfo = await this.teamModel.findUserTeamInfo(teamId)
      return teamInfo
    } catch (error) {
      console.log(error)
    }
  }

  async makeTeamObjList (teamIdList) {
    try {
      const teamShortInfoList = await Promise.all(
        teamIdList.map(
          async teamId => await this.teamModel.findUserTeamShortInfo(teamId)
        )
      )
      const teamMemberIdList = await Promise.all(
        teamShortInfoList.map(async team => {
          const ownerId = team.owner_id
          const idList = await this.belongModel.findTeamMemberWhoBelongto(
            team.id
          )
          idList.push(ownerId)
          return idList
        })
      )
      const teamMemberThumbnailList = await Promise.all(
        teamMemberIdList.map(
          async list =>
            await list.map(async memberId => {
              const thumbnailInfo = await this.userModel.findThumbnailById(
                memberId
              )
              return { id: memberId, thumbnail: thumbnailInfo.thumbnail }
            })
        )
      )

      console.log('teamMemberThumbnailList:', teamMemberThumbnailList)
      return teamMemberIdList
    } catch (error) {
      console.log(error)
    }
  }

  async findTeamMemberList (teamId) {
    try {
      const belongMember = await this.belongModel.findTeamMemberWhoBelongto(
        teamId
      )
      return belongMember
    } catch (error) {
      console.log(error)
    }
  }

  async checkIsGathered (teamId) {
    try {
      const isGathered = await this.teamModel.checkIsGathered(teamId)
      return isGathered
    } catch (error) {
      console.log(error)
    }
  }

  async joinTeamToBelong (data) {
    try {
      const is_verified = 1
      const teamId = data.teamId
      // create belong
      await this.belongModel.createTeamMember(data)

      // if length == maxnumber -> update is verified = 1 //controller로 가야할까?
      const belongMember = await this.belongModel.findTeamMemberWhoBelongto(
        teamId
      )
      const maxMember = await this.teamModel.findTeamMaxMemberNum(teamId)
      if (belongMember.length + 1 === maxMember) {
        await this.teamModel.updateTeamIsVerified({ teamId, is_verified })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getTeamGender (teamId) {
    try {
      const teamGender = await this.teamModel.findTeamGender(teamId)
      return teamGender
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = TeamService
