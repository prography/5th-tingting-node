const MeService = require('../services/MeService')
const TeamService = require('../services/TeamService')
const MatchingService = require('../services/MatchingService')
const UserService = require('../services/UserService')

const AWS = require('aws-sdk')

const getMyInfo = async (req, res) => {
  const userId = req.token.id
  const myService = new MeService()
  try {
    const myInfo = await myService.getMyInfo(userId)
    const myTeamList = await myService.getMyTeamList(userId)
    const sentMatchings = await myService.getMySentMatchings(userId, myTeamList)
    const data = {
      myInfo,
      myTeamList,
      sentMatchings
    }
    console.log(data)
    res.status(200).json({ data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
  }
}

const updateMyInfo = async (req, res) => {
  const myService = new MeService()
  const userId = req.token.id
  const { name, height, thumbnail } = req.body
  try {
    await myService.updateMyInfo({
      userId,
      name,
      height,
      thumbnail
    })
    const data = { message: '내 정보 수정에 성공했습니다.' }
    console.log(data)
    res.status(201).json({ data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
  }
}

const getMyTeamInfo = async (req, res) => {
  const teamService = new TeamService()
  const myService = new MeService()
  try {
    const userId = req.token.id
    const teamId = parseInt(req.params.id)
    const teamInfo = await teamService.getTeamInfo(teamId, false)
    if (teamInfo !== null) {
      const myTeamList = await myService.getMyTeamList(userId)
      const myTeamIdList = myTeamList.map(team => team.id)
      const isMember = myTeamIdList.includes(teamId)
      if (isMember) {
        const teamMembers = await teamService.getTeamMembersInfo(
          req.params.id,
          teamInfo.owner_id
        )
        const teamMatchings = await teamService.getTeamMatchingInfo(teamId)
        const data = {
          teamInfo,
          teamMembers,
          teamMatchings
        }
        console.log(data)
        res.status(200).json({ data })
      } else {
        const errorMessage = '팀에 속해있지 않음'
        console.log({ errorMessage })
        res.status(403).json({ errorMessage })
      }
    } else {
      const errorMessage = '팀 정보 없음'
      console.log({ errorMessage })
      res.status(404).json({ errorMessage })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
  }
}

// 팀 수정
const updateMyTeam = async (req, res) => {
  const myService = new MeService()
  const teamId = parseInt(req.params.id)
  const userId = req.token.id
  const {
    body: { name, chat_address, place, password, max_member_number, tagIds }
  } = req
  try {
    const myTeamList = await myService.getMyTeamList(userId)
    const myTeamIdList = myTeamList.map(team => team.id)
    const isMember = myTeamIdList.includes(teamId)
    if (isMember) {
      await myService.updateMyTeam({
        teamId,
        name,
        chat_address,
        place,
        password,
        max_member_number,
        tagIds
      })
      const data = { message: '내 팀 수정에 성공했습니다.' }
      console.log(data)
      res.status(201).json({ data })
    } else {
      const errorMessage = '수정하고자 하는 팀에 속해있지 않음'
      console.log({ errorMessage })
      res.status(403).json({ errorMessage })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
  }
}

const leaveMyTeam = async (req, res) => {
  const myService = new MeService()
  const teamService = new TeamService()
  const matchingService = new MatchingService()

  try {
    const teamId = parseInt(req.params.id)
    const userId = req.token.id

    const isGathered = await teamService.checkIsGathered(teamId)
    const isMatched = await matchingService.checkIsMatched(teamId)
    const isOwner = await myService.checkIsOwner({ userId, teamId })
    const myTeamList = await myService.getMyTeamList(userId)
    const myTeamIdList = myTeamList.map(team => team.id)
    const isMember = myTeamIdList.includes(teamId)
    if (isMember) {
      if (!isGathered) {
        // 방 팀원이 다 안찬 팀
        if (isOwner) {
          await myService.deleteMyTeam(teamId)
          const data = { message: '팀장 권한으로 팀 제거 완료(팀 채널)' }
          console.log(data)
          res.status(200).json({ data })
        } else {
          await myService.removeMeFromTeam({ userId, teamId })
          const data = { message: '팀원 나가기 완료(팀 채널)' }
          console.log(data)
          res.status(200).json({ data })
        }
      } else if (!isMatched) {
        // 찼지만 매칭이 안된 팀
        // 관련 데이터 matching, accept, apply 지우기
        await matchingService.deleteMatchingdata(teamId) // deleted 1
        if (isOwner) {
          await myService.deleteMyTeam(teamId) // team deleted 1 belong destroy
          const data = { message: '팀장 권한으로 팀 제거 완료(매칭 채널)' }
          console.log(data)
          res.status(200).json({ data })
        } else {
          await myService.removeMeFromTeam({ userId, teamId })
          const data = { message: '팀원 나가기 완료(매칭 채널)' }
          console.log(data)
          res.status(200).json({ data })
        }
      } else {
        const errorMessage = '이미 매칭 된 팀, 나가기 불가'
        console.log({ errorMessage })
        res.status(400).json({ errorMessage })
      }
    } else {
      const errorMessage = '나가고자 하는 팀에 속해있지 않음'
      console.log({ errorMessage })
      res.status(403).json({ errorMessage })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
  }
}

const updateMyThumbnailImg = async (req, res) => {
  const userService = new UserService()
  const myService = new MeService()
  const thumbnail = req.file.key
  const userId = req.token.id
  try {
    const key = await userService.getUserThumbnailUrl(userId)
    var s3 = new AWS.S3()
    if (key) {
      await s3.deleteObject({
        Bucket: process.env.BUCKET,
        Key: key
      }).promise()
    }
    await myService.saveMyThumbnail({ thumbnail, userId })
    const data = { message: '이미지 수정에 성공했습니다.' }
    console.log(data)
    res.status(201).json({ data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
  }
}

const saveMyProfileImg = async (req, res) => {
  const myService = new MeService()
  const profileImg = req.file.key
  const userId = req.token.id
  try {
    await myService.saveMyProfileImg({ profileImg, userId })
    const data = { message: '이미지 저장에 성공하였습니다.' }
    console.log(data)
    res.status(201).json({ data })
  } catch (error) {
    const errorMessage = '이미지 저장에 실패하였습니다.'
    console.log({ errorMessage })
    console.log(error)
    return res.status(500).json({ errorMessage })
  }
}

const updateMyProfileImg = async (req, res) => {
  const myService = new MeService()
  const profileImg = req.file.key
  const userId = req.token.id
  const imgId = req.params.imgId
  try {
    const key = await myService.getMyProfileImgUrl(imgId)
    var s3 = new AWS.S3()
    await s3.deleteObject({
      Bucket: process.env.BUCKET,
      Key: key
    }).promise()
    await myService.updateMyProfileImg({ profileImg, imgId, userId })
    const data = { message: '이미지 수정에 성공했습니다.' }
    console.log(data)
    res.status(201).json({ data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
  }
}

const deleteMyProfileImg = async (req, res) => {
  const myService = new MeService()
  const userId = req.token.id
  const imgId = req.params.imgId
  try {
    const key = await myService.getMyProfileImgUrl(imgId)
    var s3 = new AWS.S3()
    await s3.deleteObject({
      Bucket: process.env.BUCKET,
      Key: key
    }).promise()
    await myService.deleteMyProfileImg({ userId, imgId })
    const data = { message: '이미지 삭제에 성공했습니다.' }
    console.log(data)
    res.status(201).json({ data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
  }
}

module.exports = {
  getMyInfo,
  updateMyInfo,
  updateMyTeam,
  getMyTeamInfo,
  leaveMyTeam,
  updateMyThumbnailImg,
  saveMyProfileImg,
  updateMyProfileImg,
  deleteMyProfileImg
}
