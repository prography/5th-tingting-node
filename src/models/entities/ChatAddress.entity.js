const Sequelize = require('sequelize')
const db = require('../../loaders/dbLoader')

const ChatAddress = db.define(
  'chatAddress',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(5),
      allowNull: false,
      unique: true
    },
    address: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true
    },
    manager: {
      type: Sequelize.STRING(4),
      allowNull: false
    }
  },
  {
    tableName: 'chat_address',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  }
)
module.exports = ChatAddress
