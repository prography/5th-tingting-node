const express = require('express')
const { verifyToken } = require('../../../middlewares/auth')
const {
  getMyInfo,
  updateMyInfo,
  getMyTeamInfo,
  updateMyTeam,
  leaveMyTeam
} = require('../../../controllers/meController')

const router = express.Router()

router.get('/profile', verifyToken, getMyInfo) // 내 프로필 보기
<<<<<<< HEAD
router.patch('/profile', verifyToken, updateMyInfo) // 내 프로필 수정
router.get('/teams/:id', verifyToken, getMyTeamInfo) // 내 팀 정보 보기
router.patch('/teams/:id', verifyToken, updateMyTeam) // 내 팀 정보 수정
router.post('/teams/:id/leave', verifyToken, leaveMyTeam) // 내 팀 떠나기

=======
// router.get('/profile', getMyInfo)
router.patch('/profile', updateMyInfo) // 내 프로필 수정
router.get('/teams/:id', verifyToken, getMyTeamInfo) // 내 팀 정보 보기
router.patch('/teams/:id', updateMyTeam) // 내 팀 정보 수정
router.post('/teams/:id/leave', verifyToken, leaveMyTeam) // 내 팀 떠나기
<<<<<<< HEAD
>>>>>>> me/team 저체 수정
=======
>>>>>>> 8c0c5e4672cef45178b76861bf01d8674d1a8075
module.exports = router
