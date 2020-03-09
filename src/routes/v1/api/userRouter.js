const express = require('express')
const { verifyToken } = require('../../../middlewares/auth')
const { getUserInfo, getUserThumbnailImg, getUserProfileImg } = require('../../../controllers/userController')

const router = express.Router()

router.get('/:id/profile', verifyToken, getUserInfo) // 다른사람 프로필 보기
router.get('/:userId/thumbnail-img', verifyToken, getUserThumbnailImg) // 유저의 썸네일 사진 보기
router.get('/:userId/profile-img/:imgId', verifyToken, getUserProfileImg) // 유저의 프로필 사진 보기

module.exports = router
