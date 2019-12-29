const express = require('express')
const {
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

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.post('/duplicate-name', checkDuplicateName)
router.post('/school', checkValidEmail)
router.post('/school/confirm', verifyEmailToken, confirmEmailToken)
router.get('/school/complete', checkEmailAuth)

module.exports = router
