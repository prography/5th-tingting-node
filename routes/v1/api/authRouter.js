const express = require('express')
const {
  kakaoLogin,
  getAccessTokenByKakaoCode,
  signup,
  login,
  logout,
  checkDuplicateName,
  checkValidEmail,
  confirmEmailToken,
  checkEmailAuth
} = require('../../../controllers/authController')
const { verifyEmailToken } = require('../../../middlewares/auth')
const router = express.Router()

router.get('/kakao', kakaoLogin) // 여기 post로 바꿔야될 수도 있음
router.get('/kakao/callback', getAccessTokenByKakaoCode)
router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.post('/duplicate-name', checkDuplicateName)
router.post('/school', checkValidEmail)
router.post('/school/confirm', verifyEmailToken, confirmEmailToken)
router.get('/school/complete', checkEmailAuth)

module.exports = router
