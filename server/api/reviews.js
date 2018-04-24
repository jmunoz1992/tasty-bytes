const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Review.findAll({})
    .then(reviews => res.json(reviews))
    .catch(next)
});

router.get('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => res.json(review))
    .catch(next);
});

//create new review.  Make sure in react/redux we submit the review info with the userId and productId
router.post('/', (req, res, next) => {
  Review.create({
    title: req.body.title,
    content: req.body.content,
    numStars: req.body.numStars,
    imgUrl: req.body.imgUrl,
    productId: req.body.productId,
    userId: req.session.passport.user
  })
  .then(review => {
    res.status(201).json(review);
  })
  .catch(next);
});

//update existing review
router.put('/:id', (req, res, next) => {
  Review.update(req.body, {
    where: {
      id: req.params.id,
      userId: req.sessions.passport.user
    },
    returning: true
  })
  .then(function(results) {
    const updated = results[1][0];
    res.json(updated);
  })
  .catch(next);
});

//delete existing review
router.delete('/:id', (req, res, next) => {
  Review.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deletedReview => {
    res.send(`Review is deleted from database: ${deletedReview}`);
  })
  .catch(next);
});

module.exports = router;
