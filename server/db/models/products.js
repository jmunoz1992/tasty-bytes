const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Products = db.define('products', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shortDescription: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  fullDescription: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true
    }
  },
  inventoryQty: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: 'http://fillmurray.com/140/200',
  },
  // weight of the product itself. not including the packinging
  pkgWt: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  unitCost: {
    type: Sequelize.VIRTUAL,
    get () {
      return this.getDataValue('price') / this.getDataValue('pkgWt');
    }
  },
});

// still need to create virtual hook/getter method for avg ratings by pulling from Reviews model???

module.exports = Products;
