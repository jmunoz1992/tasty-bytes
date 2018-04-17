const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    // ONLY NEED THIS IF WE DO THE BELONGS TO MANY ASSOCIATIONS
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  shipped: {
    type: Sequelize.DATE,
    allowNull: true,
  },
 arrived: {
    type: Sequelize.DATE,
    allowNull: true,
 }
})

module.exports = Order;
