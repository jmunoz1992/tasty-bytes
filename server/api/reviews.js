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

//create new review
router.post('/', (req, res, next) => {
  Review.create(req.body)
  .then(review => {
    res.status(201).json(review);
  })
  .catch(next);
});

//update existing review
router.put('/:id', (req, res, next) => {
  Review.update(req.body, {
    where: {
      id: req.params.id
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
    res.send(`Product is deleted from database: ${deletedReview}`);
  })
  .catch(next);
});

module.exports = router;
