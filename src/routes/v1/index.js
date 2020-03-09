const express = require('express')
const userRouter = require('./api/userRouter')
const meRouter = require('./api/meRouter')
const teamRouter = require('./api/teamRouter')
const authRouter = require('./api/authRouter')
const matchingRouter = require('./api/matchingRouter')
const policyRouter = require('./api/policyRouter')
const outlinkRouter = require('./api/outlinkRouter')

const mainRouter = require('./api/mainRouter')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/me', meRouter)
router.use('/users', userRouter)
router.use('/teams', teamRouter)
router.use('/matching', matchingRouter)
router.use('/policy', policyRouter)
router.use('/outlink', outlinkRouter)

router.use('/main', mainRouter)

module.exports = router
