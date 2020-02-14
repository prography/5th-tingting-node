const Sequelize = require('sequelize')
const db = require('../../loaders/dbLoader')

const TeamTag = db.define(
  'teamTag',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    team_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    tag_id: {
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
      defaultValue: db.literal('CURRENT_TIMESTAMP'),
      onUpdate: db.literal('CURRENT_TIMESTAMP')
    }
  },
  {
    tableName: 'team_tag',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  }
)

module.exports = TeamTag
