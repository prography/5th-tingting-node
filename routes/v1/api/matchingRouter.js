const express = require('express')
const { verifyToken } = require('../../../middlewares/auth')
const {
  getMatchingList,
  getMatchingTeamInfo
} = require('../../../controllers/matchingController')
const router = express.Router()

router.get('/teams', verifyToken, getMatchingList)
router.get('/teams/:id', getMatchingTeamInfo)
// router.post('/send-heart/first')
// router.post('/send-heart')
// router.post('/receive-heart')

module.exports = router
