const router = require('express')();
const { Order, OrderLine } = require('../../db/models');


// GET all orders.
router.get('/', (req, res, next) => {
  Order.findAll({
    include: {
      model: OrderLine
    }
  })
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(next)
})

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


//DELETE an order by ID.
router.delete('/:id', (req, res, next) => {
  Order.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(deletedOrder => {
      res.send(`Order is deleted from database: ${deletedOrder}`);
    })
    .catch(next)
})

//PUT update an order's infomration.
router.put('/:id', (req, res, next) => {
  Order.update({
    id: req.body.id,
    shipped: req.body.shipped,
    arrived: req.body.arrived,
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
    .then(results => {
      const updated = results[1][0];
      res.json(updated);
    })
    .catch(next);
})

module.exports = router;


