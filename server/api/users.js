const router = require('express').Router()
const { User, Address, Review, Order, OrderLine } = require('../db/models')
module.exports = router

// router.get('/', (req, res, next) => {
//   User.findAll({
//     attributes: ['id', 'name', 'email']
//   })
//     .then(users => res.json(users))
//     .catch(next)
// })

//get basic info on a user
router.get('/:userId', (req, res, next) => {
  if (req.session.passport.user) {
    User.findById(req.session.passport.user, {
      attributes: ['id', 'name', 'email', 'addressId', 'imgUrl'],
      include: [{ model: Address, as: 'UserAddress' }]
    })
      .then(user => res.json(user))
      .catch(next)
  } else {
    res.send('Unauthenticated Access Attempt- you must be logged in to get user data');
  }
})

//get all review posts from a specific user
router.get('/:userId/reviews', (req, res, next) => {
  if (req.session.passport.user) {
    User.findById(req.session.passport.user, {
      include: [{ model: Review }]
    })
      .then(user => res.json(user.reviews))
      .catch(next)
  } else {
    res.send('Unauthenticated Access Attempt- you must be logged in to get user data');
  }
})


//get all addresses for a specific user
router.get('/:userId/addresses', (req, res, next) => {
  if (req.session.passport.user) {
    User.findById(req.session.passport.user, {
      attributes: ['id', 'name', 'email', 'addressId'],
      include: [{ model: Address, as: 'AddressOwner' }]
    })
      .then(user => res.json(user))
      .catch(next)
  }
  else {
    res.send('Unauthenticated Access Attempt- you must be logged in to get user data');
  }
})

//get order history including orderlines for a specific user
router.get('/:userId/orders', (req, res, next) => {
  if (req.session.passport.user) {
    User.findById(req.session.passport.user, {
      attributes: ['id', 'name', 'email'],
      include: [{ model: Order, include: { model: OrderLine } }]
    })
      .then(user => res.json(user))
      .catch(next)
  }
  else {
    res.send('Unauthenticated Access Attempt- you must be logged in to get user data');
  }
})

//add new user
router.post('/', (req, res, next) => {
  User.create({
    id: req.body.id,
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    imgUrl: req.body.imgUrl,
    addressId: req.body.addressId,
  })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(next);
});

// update user in database
router.put('/:userId', (req, res, next) => {
  if (req.session.passport.user) {
    User.findById(req.session.passport.user)
      .then(user => {
        user.update({
          id: req.body.id,
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          imgUrl: req.body.imgUrl,
          addressId: req.body.addressId,
        })
          .then(updatedUser => {
            const userData = {
              id: updatedUser.id,
              name: updatedUser.name,
              email: updatedUser.email,
              imgUrl: updatedUser.imgUrl
            }
            res.json(userData)
          })
      })
      .catch(next);
  }
  else {
    res.send('Unauthenticated Access Attempt- you must be logged in to get user data');
  }
});

// delete user from database
router.put('/:userId/delete', (req, res, next) => {
  let userToDestroy;
  if (req.session.passport.user) {
    User.findById(req.session.passport.user)
      .then(user => {
        userToDestroy = user.name;
        user.destroy(req.body)
          .then(() => res.send(`User named ${userToDestroy} has been destroyed`))
      })
      .catch(next);
  }
  else {
    res.send('Unauthenticated Access Attempt- you must be logged in to get user data');
  }
});
