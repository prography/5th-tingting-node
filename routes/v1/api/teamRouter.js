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
router.get('/duplicate-name', checkDuplicateTeamName)
router.get('/:id', getTeamInfo)
router.post('/:id/join', joinTeam)

module.exports = router
