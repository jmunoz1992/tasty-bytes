const router = require('express').Router()
const { Category, Product} = require('../../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Category.findAll({
    include: {
      model: Product
    }
  })
    .then(categories => res.json(categories))
    .catch(next)
})

// find specific product via categories menu
router.get('/category/:categoryId', (req, res, next) => {
  Category.findById(req.params.categoryId, {
    include: {
      model: Product,
    }
  })
    .then(product => {
      res.status(200).json(product);
    })
    .catch(next);
});

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
