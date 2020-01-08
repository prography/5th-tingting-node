const express = require('express')
const { verifyToken } = require('../../../middlewares/auth')
const {
  getTeamList,
  createTeam,
  checkDuplicateTeamName,
  getTeamInfo,
  joinTeam
} = require('../../../controllers/teamController')

const router = express.Router()

router.get('/', verifyToken, getTeamList)
router.post('/', verifyToken, createTeam)
<<<<<<< HEAD
router.get('/duplicate-name', verifyToken, checkDuplicateTeamName)
router.get('/:id', verifyToken, getTeamInfo)
router.post('/:id/join', joinTeam)
=======
router.get('/duplicate-name', checkDuplicateTeamName)
router.get('/:id', getTeamInfo)
router.post('/:id/join', verifyToken, joinTeam)
<<<<<<< HEAD
>>>>>>> Team Join
=======
>>>>>>> 8c0c5e4672cef45178b76861bf01d8674d1a8075

module.exports = router
