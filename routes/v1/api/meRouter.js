const express = require('express')
const { verifyToken } = require('../../../middlewares/auth')
const {
  uploadThumbnailToS3,
  uploadProfileImgToS3
} = require('../../../middlewares/profileImg')
const {
  getMyInfo,
  updateMyInfo,
  getMyTeamInfo,
  updateMyTeam,
  leaveMyTeam,
  updateMyThumbnailImg,
  saveMyProfileImg,
  updateMyProfileImg,
  deleteMyProfileImg
} = require('../../../controllers/meController')

const router = express.Router()

router.get('/profile', verifyToken, getMyInfo) // 내 프로필 보기
router.patch('/profile', verifyToken, updateMyInfo) // 내 프로필 수정
router.get('/teams/:id', verifyToken, getMyTeamInfo) // 내 팀 정보 보기
router.patch('/teams/:id', verifyToken, updateMyTeam) // 내 팀 정보 수정
router.post('/teams/:id/leave', verifyToken, leaveMyTeam) // 내 팀 떠나기
router.patch(
  '/thumbnail-img',
  verifyToken,
  uploadThumbnailToS3,
  updateMyThumbnailImg
) // 내 썸네일 사진 수정
router.post('/profile-img', verifyToken, uploadProfileImgToS3, saveMyProfileImg) // 내 프로필 이미지 저장
router.patch(
  '/profile-img/:imgId',
  verifyToken,
  uploadProfileImgToS3,
  updateMyProfileImg
) // 내 프로필 이미지 수정
router.delete('/profile-img/:imgId', verifyToken, deleteMyProfileImg) // 내 프로필 이미지 삭제

module.exports = router
