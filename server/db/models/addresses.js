const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  nickName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  street: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.CHAR(2),
    allowNull: false
  },
  zipcode: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  fullAddress: {
    type: Sequelize.VIRTUAL,
    get () {
            return this.getDataValue('name') + this.getDataValue('street') + ', ' + this.getDataValue('city') + ', ' + this.getDataValue('state') + ', ' + this.getDataValue('zipcode')
    }
})

module.exports = Address
