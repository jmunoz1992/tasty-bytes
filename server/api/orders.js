const router = require('express')();
const { Order, OrderLine } = require('../db/models');


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

//POST a new order.
router.post('/', (req, res, next) => {
  if (req.body[0][1] !== null) {
    Order.create({
      userId: req.body[0][1], email: req.body[2][1]
    }).then((orderCreated) => {
      req
        .body[1][1]
        .orderlines
        .forEach((orderline) => {
          OrderLine.create({orderId: orderCreated.dataValues.id, qty: orderline.qty, priceCents: orderline.priceCents, productId: orderline.productId})
        })
    })
  } else {
    Order
      .create({
      userId: null, email: req.body[2][1]
    }).then((orderCreated) => {
      req
        .body[1][1]
        .orderlines
        .forEach((orderline) => {
          OrderLine.create({orderId: orderCreated.dataValues.id, qty: orderline.qty, priceCents: orderline.priceCents, productId: orderline.productId})
        })
    })
  }
})

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
