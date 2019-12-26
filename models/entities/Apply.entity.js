const Sequelize = require('sequelize')
const db = require('../../loaders/dbLoader')

const Apply = db.define(
  'apply',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    },
    sender_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    matching_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'apply',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  }
)
module.exports = Apply
