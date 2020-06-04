const UserService = require('../services/UserService')
const download = require('../utils/download')

const getUserInfo = async (req, res) => {
  const userService = new UserService()
  try {
    const userInfo = await userService.getUserInfo(req.params.id)
    if (userInfo === null) {
      const errorMessage = '사용자가 존재하지 않음'
      console.log({ errorMessage })
      res.status(404).json({ errorMessage })
    } else {
      const data = { userInfo }
      console.log(data)
      res.status(200).json({ data })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
  }
}

const getUserThumbnailImg = async (req, res) => {
  const userService = new UserService()
  try {
    const userId = req.params.userId
    const key = await userService.getUserThumbnailUrl(userId)
    const stream = await download(key)
    if (stream === false) {
      res.status(404).json({ errorMessage: '사진이 존재하지 않음' })
    } else {
      res.attachment(key)
      stream.pipe(res)
    }
  } catch (error) {
    res.status(500).json({ errorMessage: '사진 불러오기 실패' })
  }
}

const getUserProfileImg = async (req, res) => {
  const userService = new UserService()
  try {
    const userId = req.params.userId
    const imgId = req.params.imgId
    const key = await userService.getUserProfileImgUrl({ userId, imgId })
    const stream = await download(key)
    if (stream === false) {
      res.status(404).json({ errorMessage: '사진이 존재하지 않음' })
    } else {
      res.attachment(key)
      stream.pipe(res)
    }
  } catch (error) {
    res.status(500).json({ errorMessage: '사진 불러오기 실패' })
  }
}

module.exports = {
  getUserInfo,
  getUserThumbnailImg,
  getUserProfileImg
}
