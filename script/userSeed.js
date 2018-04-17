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
const {User} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({name: 'Kara Graves', email: 'eda.turcott3@gmail.com', username: 'augie8', password: 'eevai5Hae', imageUrl: 'https://www.fakepersongenerator.com/Face/female/female1022160937896.jpg', isAdmin: true}),
    User.create({name: 'Stephen Mitchell', email: 'wilfrid1982@hotmail.com', username: 'lillian_lu1977', password: 'Theo8ohb', imageUrl: 'https://www.fakepersongenerator.com/Face/male/male1084953245758.jpg', isAdmin: true}),
    User.create({name: 'Dorothy Harsh', email: 'cordia1996@gmail.com', username: 'gertrude_m1981', password: 'AhQu7Roh2th', imageUrl: 'https://www.fakepersongenerator.com/Face/female/female20161025489184571.jpg', isAdmin: false}),
    User.create({name: 'Irving Gordy', email: 'christiana_kut@hotmail.com', username: 'kr33p3r1000', password: 'ya5dak9Ae', imageUrl: 'https://www.fakepersongenerator.com/Face/male/male1085232409790.jpg', isAdmin: false}),
    User.create({name: 'Leon D Ford', email: 'henry_cai4@hotmail.com', username: 'jarred_gis1979', password: 'ia4ahtohL5a', imageUrl: 'https://www.fakepersongenerator.com/Face/male/male1085894918396.jpg', isAdmin: false}),
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
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
