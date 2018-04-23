const router = require('express')();
const { Product, Category, Review } = require('../db/models')

function avgRating(prodId) {
  Review.findAll({
    where: {
      productId: prodId,
    }
  })
    .then(reviews => {
      if (reviews.length === 0) return 0;
      let total = reviews.reduce((sum, num) => {
        return sum + num.numStars;
      }, 0)
      return total / reviews.length;
    })
}

// find all products- main products homepage-works
//async issue here, not sure how to fix it!!!!!!
router.get('/', (req, res, next) => {
  Product.findAll({ where: req.query })
    .then(products => {
      products.forEach(product => {
        product.numStars = avgRating(product.id);
      })
      return products
    })
    .then(productWithRev => {
      res.status(200).json(productWithRev);
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
