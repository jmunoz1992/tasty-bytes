const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  startProcessing: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  shipped: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  arrived: {
    type: Sequelize.DATE,
    allowNull: true,
 },
  cancel: {
   type: Sequelize.DATE,
   allowNull: true,
}

})

module.exports = Order;
