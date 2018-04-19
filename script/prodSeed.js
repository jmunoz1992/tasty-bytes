/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {Product, Category} = require('../server/db/models/index.js')
const test = require('../server/db/models')


async function seed () {
  await db.sync()
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const products = await Promise.all([
    Product.create({
      title: 'chocolate strawberries',
      shortDescription: 'tasty strawberries covered in chocolate',
      fullDescription: 'show your love with some delicious strawberries glazed with the most decadent chocolate in the world',
      inventoryQty: 1000,
      pdtWt: 30, // 30 strawberries/box
      priceCents: 9999,
      image: "https://www.godivachocolates.eu/images/gene/prod/zoom/goch000340_01_godiva-gold-collection-gift-box-34pc.jpg"
    }),
    Product.create({
      title: 'chocolate truffles',
      shortDescription: 'rich chocolate truffles',
      fullDescription: 'dazzle your loved one with the best chocolate truffles',
      inventoryQty: 500,
      pdtWt: 24, // 24 chocolates per box
      priceCents: 8999,
      image: "https://www.godivachocolates.eu/images/gene/prod/zoom/goch000340_01_godiva-gold-collection-gift-box-34pc.jpg"
    }),
    Product.create({
      title: 'sour gummies',
      shortDescription: 'real sour gummies',
      fullDescription: 'pucker up these gummies are the most sour your taste buds have ever come across',
      inventoryQty: 200,
      pdtWt: 50, // 50 gummies per bag
      priceCents: 5999,
      image: "https://www.godivachocolates.eu/images/gene/prod/zoom/goch000340_01_godiva-gold-collection-gift-box-34pc.jpg"
    }),
    Product.create({
      title: 'luscious lollipops',
      shortDescription: 'lollies that you keep lickin',
      fullDescription: 'the most luscious lollipops youve ever licked, lick it up',
      inventoryQty: 700,
      pdtWt: 10, // 10 lollipops/bundle
      priceCents: 4999,
      image: "https://www.godivachocolates.eu/images/gene/prod/zoom/goch000340_01_godiva-gold-collection-gift-box-34pc.jpg"
    }),
    Product.create({
      title: 'ice cream',
      shortDescription: 'the most velvety creamy ice cream',
      fullDescription: 'this ice icream is what dreams are made of, you cant get enough of it',
      inventoryQty: 100,
      pdtWt: 10,
      priceCents: 4999,
      image: "https://www.godivachocolates.eu/images/gene/prod/zoom/goch000340_01_godiva-gold-collection-gift-box-34pc.jpg"
    }),
  ]);

  const categories = await Promise.all([
    Category.create({name: 'chocolate', description: 'candy that contains chocolate'}),
    Category.create({name: 'sour', description: 'candy that is sour'}),
    Category.create({name: 'hard candy', description: 'this is hard candy'}),
    Category.create({name: 'nuts', description: 'candy that contains nuts'}),
    Category.create({name: 'organic', description: 'candy that is made from only organic ingredients'}),
    Category.create({name: 'fair trade', description: 'candy that is made from only fair trade ingredients'}),
    ])

  const updatedProds= []

  products.forEach((product) => {
    updatedProds.push(product.setCategories([
      categories[product.id-1],
      categories[product.id]
    ]))
  })

  await Promise.all(updatedProds)

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
