const router = require('express')();
const { Order, OrderLine } = require('../db/models');


<<<<<<< HEAD
// GET particular order.
router.get('/:id', (req, res, next) => {

  Order.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: OrderLine
    }
  })
  .then(order => {
    res.status(200).json(order)
  })
  .catch(next)
})
=======
// // GET particular order.
// router.get('/:id', (req, res, next) => {
//   Order.findOne({
//     where: {
//       id: req.params.id
//     },
//     include: {
//       model: OrderLine
//     }
//   })
//   .then(order => {
//     res.status(200).json(order)
//   })
//   .catch(next)
// })
>>>>>>> 4bf570eefc529d3fd15580c1e4f46b72d0caa326

//POST a new order.
router.post('/', (req, res, next) => {
  Order.create({
    id: req.body.id,
    orderlines: {
      id: req.body.orderlines.id,
      qty: req.body.orderlines.qty,
      priceCents: req.body.orderlines.price * 100,
      productId: req.body.orderlines.productId,
      orderId: req.body.orderlines.orderId,
    }
  }, {
    include: {
      model: OrderLine,
      as: 'orderlines'
    }
  })
  .then(order => {
    res.status(201).json(order)
  })
  .catch(next);
});

//PUT update an order's infomration.
router.put('/:id', (req, res, next) => {
  Order.update({
    id: req.body.id,
    orderlines: {
      id: req.body.orderlines.id,
      qty: req.body.orderlines.qty,
      priceCents: req.body.orderlines.price * 100,
      productId: req.body.orderlines.productId,
      orderId: req.body.orderlines.orderId,
    }
  }, {
    where: {
      id: req.params.id
    },
    include: {
      model: OrderLine,
      as: 'orderlines'
    },
    returning: true
  })
  .then( results => {
    const updated = results[1][0];
    res.json(updated);
  })
  .catch(next);
})


module.exports = router;
