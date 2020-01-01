const express = require('express')

const { getTeamList, createTeam, getTeamInfo, joinTeam } = require('../../../controllers/teamController')

const router = express.Router()

router.get('/', getTeamList)
router.post('/', createTeam)
router.get('/:id', getTeamInfo)
router.post('/:id/join', joinTeam)

module.exports = router
