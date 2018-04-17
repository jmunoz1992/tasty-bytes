const router = require('express').Router()
const { User, Address, Review, Order, OrderLine } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'name', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

//get basic info on a user
router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId, {
    attributes: ['id', 'name', 'email', 'addressId'],
    include: [{ model: Address, as: 'UserAddress' }]
  })
    .then(user => res.json(user))
    .catch(next)
})

//get all review posts from a specific user
router.get('/:userId/reviews', (req, res, next) => {
  User.findById(req.params.userId, {
    attributes: ['id', 'name', 'email'],
    include: [{ model: Review }]
  })
    .then(user => res.json(user))
    .catch(next)
})

//get all addresses for a specific user
router.get('/:userId/addresses', (req, res, next) => {
  User.findById(req.params.userId, {
    attributes: ['id', 'name', 'email', 'addressId'],
    include: [{ model: Address, as: 'AddressOwner' }]
  })
    .then(user => res.json(user))
    .catch(next)
})

//get order history including orderlines for a specific user
router.get('/:userId/orders', (req, res, next) => {
  User.findById(req.params.userId, {
    attributes: ['id', 'name', 'email'],
    include: [{ model: Order, include: { model: OrderLine } }]
  })
    .then(user => res.json(user))
    .catch(next)
})

//add new user
router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(next);
});

// update user in database
router.put('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => {
      user.update(req.body)
        .then(updatedUser => {
          const userData = {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email
          }
          res.json(userData)
        })
    })
    .catch(next);
});

// delete user from database
router.put('/:userId', (req, res, next) => {
  let userToDestroy;
  User.findById(req.params.userId)
    .then(user => {
      userToDestroy = user.name;
      user.destroy(req.body)
        .then(() => res.send(`User named ${userToDestroy} has been destroyed`))
    })
    .catch(next);
});
