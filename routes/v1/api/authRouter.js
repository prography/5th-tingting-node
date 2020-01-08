const express = require('express')
const {
  kakaoLogin,
  localLogin,
  localSignup,
  checkDuplicateLocalId,
  checkDuplicateName,
  checkValidityAndSendEmail,
  confirmEmailToken,
  checkEmailAuth
} = require('../../../controllers/authController')
const { verifyEmailToken } = require('../../../middlewares/auth')
const router = express.Router()

router.post('/kakao/login', kakaoLogin)
router.post('/local/login', localLogin)
router.post('/local/signup', localSignup)
router.get('/duplicate-id', checkDuplicateLocalId)
router.get('/duplicate-name', checkDuplicateName)
<<<<<<< HEAD
<<<<<<< HEAD
router.post('/school', checkValidityAndSendEmail)
router.post('/school/confirm', verifyEmailToken, confirmEmailToken)
=======
router.post('/school', checkValidEmail)
router.get('/school/confirm', verifyEmailToken, confirmEmailToken)
>>>>>>> Team Join
=======
router.post('/school', checkValidEmail)
router.get('/school/confirm', verifyEmailToken, confirmEmailToken)
>>>>>>> 8c0c5e4672cef45178b76861bf01d8674d1a8075
router.get('/school/complete', checkEmailAuth)

module.exports = router
