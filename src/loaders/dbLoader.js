const Sequelize = require('sequelize')
const configs = require('../configs')

const db = new Sequelize(
  configs.DB.DATABASE,
	configs.DB.USERNAME,
	configs.DB.PASSWORD,
	{
		host: configs.DB.HOST,
		dialect: 'mysql'
	}
)

module.exports = db
