const express = require('express')
const { verifyToken } = require('../../../middlewares/auth')
const { getMyInfo, updateMyInfo } = require('../../../controllers/meController')

const router = express.Router()

//router.get('/profile', verifyToken, getMyInfo) // 내 프로필 보기
router.get('/profile', getMyInfo)
router.patch('/profile', updateMyInfo) // 내 프로필 수정

module.exports = router
