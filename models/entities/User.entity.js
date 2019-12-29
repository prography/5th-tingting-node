const Sequelize = require('sequelize')
const db = require('../../loaders/dbLoader')

const User = db.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    kakao_id: {
      type: Sequelize.STRING(180),
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(24),
      allowNull: false,
      unique: true
    },
    birth: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    height: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    thumbnail: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    authenticated_address: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    gender: {
      type: Sequelize.INTEGER(1),
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
      defaultValue: '0'
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true
    }
  },
  {
    tableName: 'user',
    timestamps: false,
    freezeTableName: true,
    underscored: true
  }
)

module.exports = User
