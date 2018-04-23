const router = require('express')();
const {Order, OrderLine} = require('../../db/models');

// GET all orders.
router.get('/', (req, res, next) => {
  Order
    .findAll({
    include: {
      model: OrderLine
    }
  })
    .then(orders => {
      res
        .status(200)
        .json(orders);
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  if (req.body[0][1] !== null) {
    Order.create({
      userId: req.body[0][1], email: 'z1@zeke.zeke' //hard coded. import with ricky
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
      userId: null, email: 'z2@zeke.zeke' //hard coded. import with ricky
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

router.delete('/:id', (req, res, next) => {
  Order
    .destroy({
    where: {
      id: req.params.id
    }
  })
    .then(deletedOrder => {
      res.send(`Order is deleted from database: ${deletedOrder}`);
    })
    .catch(next)
})

router.put('/:orderId', (req, res, next) => {
  Order
    .findById(req.params.orderId)
    .then(order => {
      order
        .update(req.body)
        .then(updatedOrder => {
          const orderData = {
            id: updatedOrder.id,
            shipped: updatedOrder.shipped,
            arrived: updatedOrder.arrived
          }
          res.json(orderData)
        })
    })
    .catch(next);
});

module.exports = router;
