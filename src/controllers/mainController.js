const fs = require('fs')
const path = require('path')

const getMain = async (req, res) => {
  try {
    const main = fs.readFileSync(
      path.resolve(__dirname, '../public/templates/index.html'),
      'utf8'
    )
    res.send(main)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

module.exports = {
  getMain
}
