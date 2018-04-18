const router = require('express')();
const Order = require('../db/models/order');


// GET all orders
router.get('/', (req, res, next) => {
  Order.findAll({
    where: req.query})
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(next)
  })

// GET particular order
router.get('/:id', (req, res, next) => {
  Order.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(order => {
    res.status(200).json(order)
  })
  .catch(next)
})

//POST a new order
router.post('/', (req, res, next) => {
  Order.create(req.body)
  .then(order => {
    res.status(201).json(order)
  })
  .catch(next);
});

//PUT update an order's infomration
router.put('/:id', (req, res, next) => {
  Order.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true
  })
  .then( results => {
    const updated = results[1][0];
    res.json(updated);
  })
  .catch(next);
})

//DELETE an order by ID
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

module.exports = router;