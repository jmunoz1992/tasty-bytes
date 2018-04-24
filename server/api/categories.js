const router = require('express').Router()
const { Product, Category } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Category.findAll({
    include: {
      model: Product
    }
  })
    .then(categories => res.json(categories))
    .catch(next)
})
