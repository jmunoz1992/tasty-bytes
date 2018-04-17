const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  shipped: {
    type: Sequelize.DATE,
    allowNull: true,
  },
 arrived:{
    type: Sequelize.DATE,
    allowNull: true,
 }
})

module.exports = Order;
