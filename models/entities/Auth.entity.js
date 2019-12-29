const Sequelize = require('sequelize')
const db = require('../../loaders/dbLoader')

const Auth = db.define(
  'auth',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: Sequelize.STRING(24),
      allowNull: false
    },
    authenticated_email: {
      type: Sequelize.STRING(45)
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
    tableName: 'auth',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  }
)
module.exports = Auth
