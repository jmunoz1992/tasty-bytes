const Sequelize = require('sequelize')
const db = require('../db')

const Orderline = db.define('orderline', {
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  totalPrice: {
    type: Sequelize.VIRTUAL,
    get () {
      return this.getDataValue('qty') * this.getDataValue('price');
    }
  }
});

module.exports = Orderline;
