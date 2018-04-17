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
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  inventoryQty: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  // will be calculated from all ratings from all reviews for this product
  ratingsAvg: {
    type: Sequelize.FLOAT,
    defaultValue: 0.0
  },
  // will be calculated from pkgWt / price
  unitCost: {
    type: Sequelize.FLOAT,
    defaultValue: 0.0
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['http://fillmurray.com/140/200']
  },
  // weight of the product itself. not including the packinging
  pkgWt: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Products;
