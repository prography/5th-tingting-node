const express = require('express')
const { verifyToken } = require('../../../middlewares/auth')
const {
  getMatchingList,
  getMatchingTeamInfo,
  getAppliedTeamInfo,
  sendHeartForFirst,
  sendHeart,
  receiveHeart,
  refuseHeart
} = require('../../../controllers/matchingController')
const router = express.Router()

router.get('/teams', verifyToken, getMatchingList)
router.get('/teams/:id', verifyToken, getMatchingTeamInfo)
router.get('/applied-teams/:id', getAppliedTeamInfo)
router.post('/send-heart/first', verifyToken, sendHeartForFirst)
router.post('/send-heart', verifyToken, sendHeart)
router.post('/receive-heart', verifyToken, receiveHeart)
router.post('/refuse-heart', verifyToken, refuseHeart)

module.exports = router
