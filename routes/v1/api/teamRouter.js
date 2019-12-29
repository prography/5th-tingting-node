const express = require('express')
const {
  getTeamList,
  createTeam
} = require('../../../controllers/teamController')

const router = express.Router()

router.get('/', getTeamList)
router.post('/', createTeam)

module.exports = router
