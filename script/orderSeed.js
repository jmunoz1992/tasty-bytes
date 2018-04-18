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
const { Order, OrderLine } = require('../server/db/models')

async function seed () {
  await db.sync()
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const orders = await Promise.all([
    Order.create({
      shipped: '2018-04-17 15:06:19',
      arrived: '2018-04-20 15:06:19',
      userId: 1,
      shipAddressId: 1,
      billAddressId: 1,

    }),
    Order.create({
      shipped: '2018-04-20 17:53:19',
      arrived: '2018-04-27 19:01:27',
      userId: 2,
      shipAddressId: 4,
      billAddressId: 4,
    }),
    Order.create({
      shipped: '2018-04-27 19:01:17',
      arrived: '2018-04-28 12:56:11',
      userId: 3,
      shipAddressId: 3,
      billAddressId: 3,
    }),
    Order.create({
      shipped: '2018-04-18 15:06:19',
      arrived: '2018-04-20 15:06:19',
      userId: 4,
      shipAddressId: 4,
      billAddressId: 4,
    }),
    Order.create({
      shipped: '2018-04-18 15:06:19',
      arrived: '2018-04-20 23:01:40',
      userId: 5,
      shipAddressId: 7,
      billAddressId: 8,
    }),
    Order.create({
      shipped: '2018-04-18 15:06:19',
      arrived: '2018-04-20 23:01:40',
      userId: 1,
      shipAddressId: 9,
      billAddressId: 1,
    })
  ]);
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!

  const orderLines = await Promise.all([
    OrderLine.create({
      orderId: 1,
      productId: 1,
      qty: 2,
      priceCents: 1099,
    }),
    OrderLine.create({
      orderId: 1,
      productId: 3,
      qty: 1,
      priceCents: 1299,
    }),
    OrderLine.create({
      orderId: 2,
      productId: 2,
      qty: 3,
      priceCents: 3199,
    }),
    OrderLine.create({
      orderId: 2,
      productId: 1,
      qty: 1,
      priceCents: 1599,
    }),
    OrderLine.create({
      orderId: 3,
      productId: 5,
      qty: 2,
      priceCents: 2099,
    }),
    OrderLine.create({
      orderId: 3,
      productId: 4,
      qty: 1,
      priceCents: 4099,
    }),
    OrderLine.create({
      orderId: 3,
      productId: 3,
      qty: 1,
      priceCents: 799,
    }),
    OrderLine.create({
      orderId: 4,
      productId: 5,
      qty: 2,
      priceCents: 1599,
    }),
    OrderLine.create({
      orderId: 4,
      productId: 1,
      qty: 1,
      priceCents: 1249,
    }),
    OrderLine.create({
      orderId: 5,
      productId: 4,
      qty: 8,
      priceCents: 1599,
    }),
    OrderLine.create({
      orderId: 6,
      productId: 5,
      qty: 2,
      priceCents: 1599,
    }),
  ]);

  console.log(`seeded ${orders.length} orders`)
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
