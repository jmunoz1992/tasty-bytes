const router = require('express').Router()
module.exports = router


router.use('/users', require('./users'));
router.use('/products', require('./products'))
router.use('/orders', require('./orders'))
router.use('/reviews', require('./reviews'))
router.use('/cart', require('./cart'))
router.use('/email', require('./email'))


// // USE BELOW ONCE WE HAVE ADMIN USERS AND STUFF...
// function isAdmin (req, res, next) {
//   if (req.user && req.user.isAdmin === true) {
//     next();
//   }
//   else {
//     console.log('Unauthenticated Access Attempt- you must be an Admin to access this information')
//     res.send('Unauthenticated Access Attempt- you must be an Admin to access this information');
//   }
// }

// router.use('/admin', isAdmin, require('./admin'));

//remove when we start using admin restrictions
router.use('/admin', require('./admin'));


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
