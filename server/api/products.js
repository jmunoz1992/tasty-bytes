const router = require('express')();
const Product = require('../db/models/product');
const Category = require('../db/models/category');

// find all products- main products homepage-works
router.get('/', (req, res, next) => {
  console.log('I AM IN HERE get 1');
  Product.findAll({where: req.query})
  .then(products => {
    res.status(200).json(products);
  })
  .catch(next);
});

// find specific product by id - when 'See Details' is clicked-works
router.get('/:id', (req, res, next) => {
  console.log('I AM IN HERE get 2');
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

// find specific product via categories menu
router.get('/category/:id', (req, res, next) => {
  console.log('I AM IN HERE get 3');
  Category.findById(req.params.id, {
    include: {
      model: Product,
    }
  })
  .then(product => {
    res.status(200).json(product);
  })
  .catch(next);
});


// add product to database- purely for admin
router.post('/', (req, res, next) => {
  console.log('I AM IN HERE');
  Product.create(req.body)
  .then(product => {
    res.status(201).json(product);
  })
  .catch(next);
});

// update product to database- purely for admin
router.put('/', (req, res, next) => {
  Product.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true
  })
  .then(function(results) {
    const updated = results[1][0];
    res.json(updated);
  })
  .catch(next);
});

// delete product from database- purely for admin
router.delete('/:id', (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deletedProduct => {
    res.send(`Product is deleted from database: ${deletedProduct}`);
  })
  .catch(next);
});

module.exports = router;
