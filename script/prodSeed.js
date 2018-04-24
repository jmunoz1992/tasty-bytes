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
      title: 'Dark Chocolate Strawberries',
      shortDescription: 'tasty strawberries covered in chocolate',
      fullDescription: 'show your love with some delicious strawberries glazed with the most decadent chocolate in the world',
      inventoryQty: 1000,
      pdtWt: 30, // 30 strawberries/box
      priceCents: 9999,
      image: "http://images.godiva.com/is/image/godiva/dark-chocolate-dipped-strawberries-dozen~~191241-1?$pdp-main$"
    }),
    Product.create({
      title: 'Dark Chocolate Nuts',
      shortDescription: 'rich chocolate nuts',
      fullDescription: 'dazzle your loved one with the best chocolate nuts',
      inventoryQty: 500,
      pdtWt: 24, // 24 chocolates per box
      priceCents: 8999,
      image: "http://paleogrubs.com/wp-content/uploads/2015/02/paleochocolatebark.jpg"
    }),
    Product.create({
      title: 'Dark Chocolate Bars',
      shortDescription: 'rich chocolate bars',
      fullDescription: 'dazzle your loved one with the best chocolate bars',
      inventoryQty: 500,
      pdtWt: 24, // 24 chocolates per box
      priceCents: 8999,
      image: "https://cdn.shopify.com/s/files/1/0938/5272/products/72dpi_Caragh_Chocolates_Bar-Dark_2048x2048.jpg?v=1475524721"
    }),
    Product.create({
      title: 'Dark Chocolate Cocoa',
      shortDescription: 'rich chocolate cocoa',
      fullDescription: 'dazzle your loved one with the best chocolate cocoa',
      inventoryQty: 500,
      pdtWt: 24, // 24 chocolates per box
      priceCents: 8999,
      image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/10/18/0/FNK_Peppermint-Hot-Cocoa_s4x3.jpg.rend.hgtvcom.616.462.suffix/1383787064560.jpeg"
    }),
    Product.create({
      title: 'Dark Chocolate Cookies',
      shortDescription: 'rich chocolate cookies',
      fullDescription: 'dazzle your loved one with the best chocolate truffles',
      inventoryQty: 500,
      pdtWt: 24, // 24 chocolates per box
      priceCents: 8999,
      image: "https://img.taste.com.au/7jFlsVdA/taste/2016/11/fudgy-chocolate-caramel-biscuits-74737-1.jpeg"
    }),
    Product.create({
      title: 'Sour Gummies',
      shortDescription: 'real sour gummies',
      fullDescription: 'pucker up these gummies are the most sour your taste buds have ever come across',
      inventoryQty: 200,
      pdtWt: 50, // 50 gummies per bag
      priceCents: 5999,
      image: "https://www.godivachocolates.eu/images/gene/prod/zoom/goch000340_01_godiva-gold-collection-gift-box-34pc.jpg"
    }),
    Product.create({
      title: 'Hard Candy Lollipops',
      shortDescription: 'lollies that you keep lickin',
      fullDescription: 'the most luscious lollipops youve ever licked, lick it up',
      inventoryQty: 700,
      pdtWt: 10, // 10 lollipops/bundle
      priceCents: 4999,
      image: "https://www.godivachocolates.eu/images/gene/prod/zoom/goch000340_01_godiva-gold-collection-gift-box-34pc.jpg"
    }),
    Product.create({
      title: 'Sour Chocolate Ice Cream',
      shortDescription: 'the most velvety creamy ice cream',
      fullDescription: 'this ice icream is what dreams are made of, you cant get enough of it',
      inventoryQty: 100,
      pdtWt: 10,
      priceCents: 4999,
      image: "https://www.godivachocolates.eu/images/gene/prod/zoom/goch000340_01_godiva-gold-collection-gift-box-34pc.jpg"
    }),
  ]);

  let categories = await Promise.all([
    Category.create({name: 'Dark Chocolate', description: 'candy that contains chocolate'}), // 3
    Category.create({name: 'Lollipops', description: 'candy on sticks'}), // 1
    Category.create({name: 'Hard Candy', description: 'this is hard candy'}), // 1
    Category.create({name: 'Nuts', description: 'candy that contains nuts'}), // 1
    Category.create({name: 'Gummies', description: 'chewy candy'}), // 1
    Category.create({name: 'Sour', description: 'candy that is sour'}), // 2
    Category.create({name: 'Ice Cream', description: 'candy that is creamy and cold'}), // 1
    ])

  const updatedProds= []
  products.forEach((product) => {
    const productName = product.title.toLowerCase();
    const result = categories.filter(category => productName.indexOf(category.name.toLowerCase()) > -1);
    updatedProds.push(product.setCategories(result))
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
