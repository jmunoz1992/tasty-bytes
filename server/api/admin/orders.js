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


router.put('/:orderId', (req, res, next) => {
  console.log('my req.body is: ', req.body)
  Order.findById(req.params.orderId)
    .then(order => {
      console.log('my order is ', req)
      order.update(req.body)
        .then(updatedOrder => {
          console.log('updated order: ', updatedOrder)
          const orderData = {
              id: updatedOrder.id,
              shipped: updatedOrder.shipped,
              arrived: updatedOrder.arrived,
          }
          res.json(orderData)
        })
    })
    .catch(next);
});



module.exports = router;


