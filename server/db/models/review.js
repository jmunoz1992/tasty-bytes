const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  //ONLY NEED THIS IF WE DO THE BELONGS TO MANY ASSOCIATIONS
  // id: {
  //   type: Sequelize.INTEGER,
  //   autoIncrement: true,
  //   primaryKey: true,
  //   allowNull: false
  // },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  numStars: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imgUrl: {
    type: Sequelize.STRING,
  }
})


module.exports = Review
