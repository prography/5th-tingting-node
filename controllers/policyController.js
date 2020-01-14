const fs = require('fs')
const path = require('path')

const getRule = async (req, res) => {
  try {
    const rule = fs.readFileSync(
      path.resolve(__dirname, '../public/html/rule.html'),
      'utf8'
    )
    res.send(rule)
  } catch (error) {
    res.sendStatus(500)
  }
}

const getPrivacy = async (req, res) => {
  try {
    const privacy = fs.readFileSync(
      path.resolve(__dirname, '../public/html/privacy.html'),
      'utf8'
    )
    res.send(privacy)
  } catch (error) {
    res.sendStatus(500)
  }
}

module.exports = {
  getRule,
  getPrivacy
}
