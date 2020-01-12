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
    console.log(error)
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
    console.log(error)
  }
}

module.exports = {
  getRule,
  getPrivacy
}
