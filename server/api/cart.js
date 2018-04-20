const router = require('express')();
const { Product } = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// To calculate the total price of the order, given the items in the cart
// function calculateOrderTotal (products) {
//   let total = 0;
//   products.forEach(product =>
//     total += product.priceActual * product.qty
//   );
//   return total;
// }

// This route will only be triggered if a user follows a link to get to their cart
// If the session doesn't have a cart associated with it, it will create a cart
// Otherwise, the cart will be sent to the front-end
// If the cart is empty, on the front-end, the user will receive a message saying
// their cart is empty
router.get('/', (req, res, next) => {
  if (!req.session.cart) req.session.cart = [];
  res.json(req.session.cart);
});

//get current product price and inv qty for the cart
router.post('/productInfo', (req, res, next) => {
  Product.findAll({
    where: {
      id: {
        [Op.in]: req.body.products
      }
    },
    attributes: ['id', 'inventoryQty', 'priceCents', 'pdtWt']
  })
  .then(prices => {
    res.status(200).json(prices)
  }).catch(next);
})

// This route is triggered when you press any 'add to cart' button
// If your cart doesn't already exist, make a new array to hold it
// Go through the cart - if the product already exists in the cart, increase the current quantity by 1
// If the product isn't in your cart, push relevant product info to cart
// One either is done, send the cart array back to the client
router.put('/', (req, res, next) => {
  if (!req.session.cart) req.session.cart = [];
  let found = false;
  for (let i = 0; i < req.session.cart.length; i++) {
    if (req.body.id === req.session.cart[i].id) {
      // const oldQty = req.session.cart.products[i].qty;
      // req.session.cart.products[i].qty += req.body.qty - oldQty;
      req.session.cart[i].qty = req.body.qty;
      if (req.session.cart[i].qty === 0) {
        req.session.cart.splice(i, 1);
      }
      res.json(req.session.cart);
      found = true;
      break;
    }
  }
  if (found === false) {
    Product.findById(req.body.id)
    .then(product => {
      req.session.cart.push({
        id: product.id,
        title: product.title,
        shortDescription: product.shortDescription,
        // priceActual: product.priceActual,
        // inventoryQty: product.inventoryQty,
        image: product.image,
        qty: req.body.qty
      });
      res.json(req.session.cart);
    })
    .catch(next);
  }
});

router.delete('/:productId', (req, res, next) => {
  req.session.cart = req.session.cart.filter(product =>
    product.id !== +req.params.productId
  );
  res.json(req.session.cart);
});

module.exports = router;
