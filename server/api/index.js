const router = require('express').Router()
const passport = require('passport')
module.exports = router

router.use('/users', require('./users'));
router.use('/products', require('./products'))
router.use('/orders', require('./orders'))
router.use('/reviews', require('./reviews'))


// // USE BELOW ONCE WEW HAVE ADMIN USERS AND STUFF...
// function isAdmin (req, res, next) {
//   if (req.user && req.user.isAdmin === true) {
//     next();
//   }
//   else {
//     res.status(401).send('Unauthenticated Access Attempt- you must be an Admin to access this information');
//   }
// }

// router.use('/admin', isAdmin, require('./admin'));

router.use('/admin', require('./admin'));


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
