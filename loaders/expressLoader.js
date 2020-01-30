const api = require('../routes/index')
const bodyParser = require('body-parser')
const config = require('../config')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const expressLoader = app => {
  app.set('port', config.PORT)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
  logger.token('request-body', (req, res) => {
    return JSON.stringify(req.body)
  })
  // logger.token('response-body', (req, res) => {
  //   delete res.req
  //   return String(res.json)
  // })
  app.use(
    logger(
      ':remote-addr :date[iso] :method :url :request-body :status :response-time'
    )
  )
  app.use('/api', api)
}

module.exports = expressLoader
