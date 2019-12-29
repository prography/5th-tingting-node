const express = require('express')
const { verifyToken } = require('../../../middlewares/auth')
const { getMyInfo, updateMyInfo, updateMyTeam } = require('../../../controllers/meController')

const router = express.Router()

// router.get('/profile', verifyToken, getMyInfo) // 내 프로필 보기
router.get('/profile', getMyInfo)
router.patch('/profile', updateMyInfo) // 내 프로필 수정
router.patch('/teams/:id', updateMyTeam) // 내 팀 수정

module.exports = router
