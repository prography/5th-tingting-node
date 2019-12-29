const Sequelize = require('sequelize')
const db = require('../../loaders/dbLoader')

const AvailableEmail = db.define(
  'availableEmail',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    domain: {
      type: Sequelize.STRING(150),
      allowNull: false
    },
    is_university: {
      type: Sequelize.INTEGER(1),
      allowNull: false
    }
  },
  {
    tableName: 'available_email',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  }
)
module.exports = AvailableEmail
