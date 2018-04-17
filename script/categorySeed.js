const db = require('../server/db')
const {Category} = require('../server/db/models')

async function seed () {
  await db.sync()
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const categories = await Promise.all([
    Category.create({name: 'chocolate', description: 'candy that contains chocolate'}),
    Category.create({name: 'sour', description: 'candy that is sour'}),
    Category.create({name: 'hard candy', description: 'this is hard candy'}),
    Category.create({name: 'nuts', description: 'candy that contains nuts'}),
    Category.create({name: 'organic', description: 'candy that is made from only organic ingredients'}),
    Category.create({name: 'fair trade', description: 'candy that is made from only fair trade ingredients'}),
    ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${categories.length} categories`)
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
