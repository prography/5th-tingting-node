const fs = require('fs')
const path = require('path')

const getRule = async (req, res) => {
  try {
    const rule = fs.readFileSync(
      path.resolve(__dirname, '../public/templates/rule.html'),
      'utf8'
    )
    res.send(rule)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const getPrivacy = async (req, res) => {
  try {
    const privacy = fs.readFileSync(
      path.resolve(__dirname, '../public/templates/privacy.html'),
      'utf8'
    )
    res.send(privacy)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

module.exports = {
  getRule,
  getPrivacy
}
