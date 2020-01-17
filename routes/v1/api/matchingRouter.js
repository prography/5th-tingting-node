const express = require('express')
const { verifyToken } = require('../../../middlewares/auth')
const {
  getMatchingList,
  getMatchingTeamInfo,
  sendHeartForFirst,
  sendHeart
} = require('../../../controllers/matchingController')
const router = express.Router()

router.get('/teams', verifyToken, getMatchingList)
// router.get('/teams/:id', getMatchingTeamInfo)
router.post('/send-heart/first', verifyToken, sendHeartForFirst)
router.post('/send-heart', verifyToken, sendHeart)
// router.post('/receive-heart')

module.exports = router
