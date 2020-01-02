const express = require('express')
const {
  kakaoLogin,
  getAccessTokenByKakaoCode,
  kakaoSignup,
  localLogin,
  localSignup,
  logout,
  checkDuplicateLocalId,
  checkDuplicateName,
  checkValidEmail,
  confirmEmailToken,
  checkEmailAuth
} = require('../../../controllers/authController')
const { verifyEmailToken } = require('../../../middlewares/auth')
const router = express.Router()

router.get('/kakao/login', kakaoLogin)
router.get('/kakao/callback', getAccessTokenByKakaoCode)
router.post('/kakao/signup', kakaoSignup)
router.post('/local/login', localLogin)
router.post('/local/signup', localSignup)
router.get('/logout', logout)
router.post('/duplicate-id', checkDuplicateLocalId)
router.post('/duplicate-name', checkDuplicateName)
router.post('/school', checkValidEmail)
router.post('/school/confirm', verifyEmailToken, confirmEmailToken)
router.get('/school/complete', checkEmailAuth)

module.exports = router
