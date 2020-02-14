const Sequelize = require('sequelize')
const db = require('../../loaders/dbLoader')

const Tag = db.define(
  'tag',
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
      defaultValue: db.literal('CURRENT_TIMESTAMP'),
      onUpdate: db.literal('CURRENT_TIMESTAMP')
    },
    name: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    kind: {
      type: Sequelize.STRING(45),
      allowNull: false
    }
  },
  {
    tableName: 'tag',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  }
)
module.exports = Tag
