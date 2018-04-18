const Sequelize = require('sequelize')
const db = require('../db')

const Orderline = db.define('orderline', {
    id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  priceCents: {
    type: Sequelize.DECIMAL(5, 2), // initially setting for upper price limit to be 999.99
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
