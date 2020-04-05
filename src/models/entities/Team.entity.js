const Sequelize = require('sequelize')
const db = require('../../loaders/dbLoader')

const Team = db.define(
  'team',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(24),
      allowNull: false,
      unique: true
    },
    chat_address: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    owner_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    intro: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    gender: {
      type: Sequelize.INTEGER(1),
      allowNull: false
    },
    place: {
      type: Sequelize.STRING(12),
      allowNull: true
    },
    password: {
      type: Sequelize.STRING(45),
      allowNull: true,
      defaultValue: null
    },
    is_verified: {
      type: Sequelize.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    max_member_number: {
      type: Sequelize.INTEGER(3),
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
    },
    is_deleted: {
      type: Sequelize.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    deleted_at: {
      type: Sequelize.DATE,
      defaultValue: null
    }
  },
  {
    tableName: 'team',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  }
)

module.exports = Team
