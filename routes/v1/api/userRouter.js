const express = require('express')
const { verifyToken } = require('../../../middlewares/auth')
const { getUserInfo } = require('../../../controllers/userController')

const router = express.Router()

router.get('/:id/profile', verifyToken, getUserInfo) // 다른사람 프로필 보기

module.exports = router
