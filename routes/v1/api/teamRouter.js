const express = require('express')

const { getTeamList, createTeam, getTeamInfo } = require('../../../controllers/teamController')

const router = express.Router()

router.get('/', getTeamList)
router.post('/', createTeam)
router.get('/:id', getTeamInfo)

module.exports = router
