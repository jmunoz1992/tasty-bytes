const router = require('express')();
const { Product } = require('../../db/models');


// add product to database- purely for admin
router.post('/', (req, res, next) => {
  Product.create({
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    fullDescription: req.body.fullDescription,
    inventoryQty: +req.body.inventoryQty,
    image: req.body.image,
    pdtWt: +req.body.pdtWt,
    priceCents: +req.body.priceActual * 100
  })
    .then(product => {
      res.status(201).json(product);
    })
    .catch(next);
});

// update product to database- purely for admin
router.put('/:id', (req, res, next) => {
  Product.update({
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    fullDescription: req.body.fullDescription,
    inventoryQty: +req.body.inventoryQty,
    image: req.body.image,
    pdtWt: +req.body.pdtWt,
    priceCents: +req.body.priceActual * 100
  }, {
    where: {
      id: req.params.id
    },
    returning: true
  })
    .then(function (results) {
      const updated = results[1][0];
      res.json(updated);
    })
    .catch(next);
});

router.put('/:productId/delete', (req, res, next) => {
  let productToDestroy;
  Product.findById(req.params.productId)
    .then(product => {
      productToDestroy = product.title;
      product.destroy(req.body)
        .then(() => res.send(`${productToDestroy} has been removed from the database`))
    })
    .catch(next);
});


module.exports = router;
