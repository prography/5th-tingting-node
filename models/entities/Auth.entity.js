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
    authenticated_email: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    is_authenticated: {
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
      defaultValue: db.literal(
        'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
      )
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
