const Sequelize = require('sequelize')
const db = require('../db')
const { Review } = require('./')


const Product = db.define('product', {
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
    defaultValue: 'https://www.godivachocolates.eu/images/gene/prod/zoom/goch000340_01_godiva-gold-collection-gift-box-34pc.jpg',
  },
  // weight of the product itself. not including the packinging
  pdtWt: {
    type:Sequelize.INTEGER,
    allowNull: false
  },
  priceCents: {
    type: Sequelize.INTEGER, // will be in cents
    allowNull: false
  },
  priceActual: {
    type: Sequelize.VIRTUAL,
    get () {
      return (this.getDataValue('priceCents') / 100).toFixed(2);
    }
  },
  unitCost: {
    type: Sequelize.VIRTUAL,
    get () {
      return Math.round(this.getDataValue('priceCents') / 100 / this.getDataValue('pdtWt') * 100) / 100;
    }
  },
} );

// Product.prototype.avgRating = () => {
//   Review.findAll({
//     where: {
//       productId: this.id,
//     }
//   })
//   .then(reviews => {
//     if (reviews.length === 0) return 0;
//       let total = reviews.reduce((sum, num) => {
//         return sum + num;
//       })
//       return total / reviews.length;
//   })
// }

// still need to create virtual hook/getter method for avg ratings by pulling from Reviews model???

module.exports = Product;
