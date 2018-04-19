const router = require('express').Router()
const { Category} = require('../../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Category.findAll({
  })
    .then(categories => res.json(categories))
    .catch(next)
})


//add new user
router.post('/', (req, res, next) => {
  Category.create({
    name: req.body.name,
    description: req.body.description,
  })
    .then(category => {
      res.status(201).json(category);
    })
    .catch(next);
});

// delete category from database
router.put('/:categoryId/delete', (req, res, next) => {
  let categoryToDestroy;
  Category.findById(req.params.categoryId)
    .then(category => {
      categoryToDestroy = category.name;
      category.destroy()
        .then(() => res.send(`Category ${categoryToDestroy} has been destroyed`))
    })
    .catch(next);
});
