const router = require('express')();
const { Product, Category, Review } = require('../db/models')


// find all products- main products homepage-works
//async issue here, not sure how to fix it!!!!!!
router.get('/', (req, res, next) => {
  Product.findAll({
    include: {
      model: Review,
    }
  })
    .then(products => {
      return res.status(200).json(products);
    })
    .catch(next);
});

// find specific product by id - when 'See Details' is clicked-works
router.get('/:id', (req, res, next) => {
  Product.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(product => {
      res.status(200).json(product);
    })
    .catch(next);
});

// find reviews for a specific product
router.get('/:productId/reviews', (req, res, next) => {
  Product.findById(req.params.productId, {
    include: {
      model: Review,
    }
  })
    .then(product => {
      res.status(200).json(product);
    })
    .catch(next);
});

// find specific product via categories menu
router.get('/category/:categoryId', (req, res, next) => {
  Category.findById(req.params.categoryId, {
    include: {
      model: Product,
    }
  })
    .then(product => {
      res.status(200).json(product);
    })
    .catch(next);
});


module.exports = router;
