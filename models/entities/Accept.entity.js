const Sequelize = require('sequelize')
const db = require('../../loaders/dbLoader')

const Accept = db.define(
  'accept',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    accepter_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    matching_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: db.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: db.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    }
  },
  {
    tableName: 'accept',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  }
)
module.exports = Accept
