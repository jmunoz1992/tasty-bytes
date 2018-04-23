const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

//combining the old DB cart with the current session cart
function combineCarts(sessionCart, dbCart) {
  if (!dbCart || dbCart.length === 0) return sessionCart;
  if (sessionCart.length === 0) {
    sessionCart = dbCart;
    return dbCart;
  }
  let found = false;
  for (let i = 0; i < dbCart.length; i++) {
    found = false;
    for (let j = 0; j < sessionCart.length; j++) {
      if (+dbCart[i].id === +sessionCart[j].id) {
        found = true;
        sessionCart[j].qty = sessionCart[j].qty + dbCart[i].qty;
        break
      }
    } if (found === false) {
      sessionCart.push(dbCart[i])
    }
  }
  return sessionCart;
}

router.post('/login', (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => {
          user.recentCart = combineCarts(req.session.cart, user.recentCart)
          return (err ? next(err) : res.json(user))
        })
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  let newUser = {
    recentCart: req.session.cart,
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }
  User.create(newUser)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  User.findById(req.session.passport.user)
    .then(user => {
      user.update({
        recentCart: req.session.cart
      })
        .then(() => {
          req.logout()
          req.session.destroy()
          res.redirect('/')
        })
    })
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
