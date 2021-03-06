const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  try {
    const schema = req.headers.authorization
    const token = schema.replace('Bearer ', '')
    req.token = jwt.verify(token, process.env.JWT_SECRET)
    return next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(419).json({
        errorMeesage: '토큰 만료'
      })
    }
    return res.status(401).json({
      errorMeesage: '토큰이 유효하지 않음'
    })
  }
}

const verifyEmailToken = (req, res, next) => {
  try {
    req.token = jwt.verify(req.query.token, process.env.JWT_SECRET_EMAIL)
    return next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(419).json({ errorMessage: '토큰 만료' })
    }
    return res.status(401).json({ errorMessage: '토큰이 유효하지 않음' })
  }
}

module.exports = {
  verifyToken,
  verifyEmailToken
}
