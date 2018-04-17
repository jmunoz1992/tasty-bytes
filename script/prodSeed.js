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
const {Product} = require('../server/db/models')

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
      pkgWt: 30, // 30 strawberries/box
      price: 99.99
    }),
    Product.create({
      title: 'chocolate truffles',
      shortDescription: 'rich chocolate truffles',
      fullDescription: 'dazzle your loved one with the best chocolate truffles',
      inventoryQty: 500,
      pkgWt: 24, // 24 chocolates per box
      price: 89.99
    }),
    Product.create({
      title: 'sour gummies',
      shortDescription: 'real sour gummies',
      fullDescription: 'pucker up these gummies are the most sour your taste buds have ever come across',
      inventoryQty: 200,
      pkgWt: 50, // 50 gummies per bag
      price: 59.99
    }),
    Product.create({
      title: 'luscious lollipops',
      shortDescription: 'lollies that you keep lickin',
      fullDescription: 'the most luscious lollipops youve ever licked, lick it up',
      inventoryQty: 700,
      pkgWt: 10, // 10 lollipops/bundle
      price: 49.99
    }),
    Product.create({
      title: 'ice cream',
      shortDescription: 'the most velvety creamy ice cream',
      fullDescription: 'this ice icream is what dreams are made of, you cant get enough of it',
      inventoryQty: 100,
      pkgWt: 10,
      price: 49.99
    }),
  ]);
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
