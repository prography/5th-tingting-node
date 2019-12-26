const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  try {
    req.token = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    )
    return next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        meesage: '토큰 만료'
      })
    }
    return res.status(401).json({
      code: 401,
      message: '토큰이 유효하지 않음'
    })
  }
}

module.exports = {
  verifyToken
}
