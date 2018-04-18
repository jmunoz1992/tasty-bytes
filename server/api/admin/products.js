const router = require('express')();
// const { Product } = require('../db/models');

// Collin's passport code is not working
// const passport = require('passport');

// router.use(passport());

// function isAdmin (req, res, next) {
//   if (req.user && req.user.isAdmin === true) {
//     next();
//   }
//   else {
//     throw 'Unauthenticated';
//   }
// }

// router.use('/api/admin', isAdmin, adminRouter);


router.put('/products/:id', async (req, res, next) => {
  try {
      const result = await req.user.update({
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      fullDescription: req.body.fullDescription,
      inventoryQty: req.body.inventoryQty,
      image: req.body.image,
      pkgWt: req.body.pkgWt,
      priceCents: req.body.priceActual * 100
    }, {
      where: {
        id: req.params.id
      },
      returning: true
    });
    const updated = result[1][0];
    res.json(updated);
  } catch (err) {
    console.log('ERROR IN PUT: ', err);
  }
});

router.post('/products', async (req, res, next) => {
  try {
    const result = await req.user.post({
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      fullDescription: req.body.fullDescription,
      inventoryQty: req.body.inventoryQty,
      image: req.body.image,
      pkgWt: req.body.pkgWt,
      priceCents: req.body.priceActual * 100
    });
    res.status(201).json(result);
  } catch (err) {
    console.log('ERROR IN POST ', err);
  }
});

router.delete('/products/:id', async (req, res, next) => {
  try {
    const result = await req.user.destroy({
      where: {
        id: req.params.id
      }
    });
    res.send(`Product is deleted from database: ${result}`);
  } catch (err) {
    console.log('ERROR IN DELETE ', err);
  }
});

// add product to database- purely for admin
// router.post('/', (req, res, next) => {
//   Product.create(req.body)
//   .then(product => {
//     res.status(201).json(product);
//   })
//   .catch(next);
// });

// update product to database- purely for admin
// router.put('/:id', (req, res, next) => {
//   Product.update(req.body, {
//     where: {
//       id: req.params.id
//     },
//     returning: true
//   })
//   .then(function(results) {
//     const updated = results[1][0];
//     res.json(updated);
//   })
//   .catch(next);
// });

// delete product from database- purely for admin
// router.delete('/:id', (req, res, next) => {
//   Product.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//   .then(deletedProduct => {
//     res.send(`Product is deleted from database: ${deletedProduct}`);
//   })
//   .catch(next);
// });

module.exports = router;
