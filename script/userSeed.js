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
const { User, Address } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({ name: 'Kara Graves', email: 'eda.turcott3@gmail.com', username: 'augie8', password: 'eevai5Hae', imageUrl: 'https://www.fakepersongenerator.com/Face/female/female1022160937896.jpg', isAdmin: true }),
    User.create({ name: 'Stephen Mitchell', email: 'wilfrid1982@hotmail.com', username: 'lillian_lu1977', password: 'Theo8ohb', imageUrl: 'https://www.fakepersongenerator.com/Face/male/male1084953245758.jpg', isAdmin: true }),
    User.create({ name: 'Dorothy Harsh', email: 'cordia1996@gmail.com', username: 'gertrude_m1981', password: 'AhQu7Roh2th', imageUrl: 'https://www.fakepersongenerator.com/Face/female/female20161025489184571.jpg', isAdmin: false }),
    User.create({ name: 'Irving Gordy', email: 'christiana_kut@hotmail.com', username: 'kr33p3r1000', password: 'ya5dak9Ae', imageUrl: 'https://www.fakepersongenerator.com/Face/male/male1085232409790.jpg', isAdmin: false }),
    User.create({ name: 'Leon D Ford', email: 'henry_cai4@hotmail.com', username: 'jarred_gis1979', password: 'ia4ahtohL5a', imageUrl: 'https://www.fakepersongenerator.com/Face/male/male1085894918396.jpg', isAdmin: false }),
  ])


  const addresses = await Promise.all([
    Address.create({ userId: 1, name: "The Gingerbread House", nickName: "The Gingerbread House", street: "846 central ave", city: "deerfield", state: "IL", zipcode: "60015" }),
    Address.create({ userId: 1, name: "The Learning Tree", nickName: "The Learning Tree", street: "75 West 10th Street ", city: "Algonquin", state: "IL", zipcode: "60102" }),
    Address.create({ userId: 1, name: "Babes n' Tots", nickName: "Babes n' Tots", street: "77 w jackson blvd", city: "chicago", state: "IL", zipcode: "60604" }),
    Address.create({ userId: 2, name: "Lamb Tails", nickName: "Lamb Tails", street: "201 Henry Street ", city: "Berwyn", state: "IL", zipcode: "60402" }),
    Address.create({ userId: 2, name: "Happy Trails Daycare", nickName: "Happy Trails Daycare", street: "7350 Howard Road ", city: "Carpentersville", state: "IL", zipcode: "60110" }),
    Address.create({ userId: 2, name: "Little Ducklings Daycare", nickName: "Little Ducklings Daycare", street: "78 Colonial Ave. ", city: "Champaign", state: "IL", zipcode: "61821" }),
    Address.create({ userId: 3, name: "Rainbow Children", nickName: "Rainbow Children", street: "982 Andover Court ", city: "Chicago Heights", state: "IL", zipcode: "60411" }),
    Address.create({ userId: 3, name: "Play Safe Playhouse", nickName: "Play Safe Playhouse", street: "948 w madison st", city: "chicago", state: "IL", zipcode: "60607" }),
    Address.create({ userId: 3, name: "The Children's Cloud", nickName: "The Children's Cloud", street: "16 e pearson st", city: "chicago", state: "IL", zipcode: "60611" }),
    Address.create({ userId: 4, name: "Kiddie Cloud", nickName: "Kiddie Cloud", street: "1448 n sedgwick st", city: "chicago", state: "IL", zipcode: "60610" }),
    Address.create({ userId: 4, name: "TOTally Kids", nickName: "TOTally Kids", street: "900 s wabash ave", city: "chicago", state: "IL", zipcode: "60605" }),
    Address.create({ userId: 4, name: "Stop n' Play", nickName: "Stop n' Play", street: "1339 1 19th st", city: "chicago", state: "IL", zipcode: "60608" }),
    Address.create({ userId: 5, name: "Learn n' Play", nickName: "Learn n' Play", street: "47 Fieldstone Rd. ", city: "Geneva", state: "IL", zipcode: "60134" }),
    Address.create({ userId: 5, name: "Mother Goose's Playschool", nickName: "Mother Goose's Playschool", street: "47 Mulberry St. ", city: "Glen Ellyn", state: "IL", zipcode: "60137" }),
    Address.create({ userId: 5, name: "Children's Den", nickName: "Children's Den", street: "530 Hanover Rd. ", city: "Glenview", state: "IL", zipcode: "60025" }),
  ])

  const updatedUsers = []

  users.forEach((user) => {
    updatedUsers.push(user.setUserAddress(addresses[user.id*3 - 1]))
  })

  await Promise.all(updatedUsers)

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
