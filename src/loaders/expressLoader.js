const api = require('../routes/index')
const bodyParser = require('body-parser')
const configs = require('../configs')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const Sentry = require('@sentry/node')

const { getMain } = require('../controllers/mainController')

const expressLoader = app => {
  Sentry.init({ dsn: configs.SENTRY_DSN })
  app.use(Sentry.Handlers.requestHandler())
  app.set('port', configs.APP.PORT)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
  logger.token('request-body', (req, res) => {
    return JSON.stringify(req.body)
  })
  app.use(
    logger(
      ':remote-addr :date[iso] :method :url :request-body :status :response-time'
    )
  )
  app.use('/api', api)
  app.get('/', getMain)
  app.use(Sentry.Handlers.errorHandler())
}

module.exports = expressLoader
