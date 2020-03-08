const Sequelize = require('sequelize')
const db = require('../../loaders/dbLoader')

const AuthPassword = db.define(
  'authPassword',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    authenticated_email: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    code: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    is_authenticated: {
      type: Sequelize.INTEGER(1)
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
    tableName: 'auth_password',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  }
)
module.exports = AuthPassword
