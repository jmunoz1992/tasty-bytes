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
      image: "https://spicysouthernkitchen.com/wp-content/uploads/hot-cocoa-3.jpg"
    }),
    Product.create({
      title: 'Dark Chocolate Cookies',
      shortDescription: 'rich chocolate cookies',
      fullDescription: 'dazzle your loved one with the best chocolate truffles',
      inventoryQty: 500,
      pdtWt: 24, // 24 chocolates per box
      priceCents: 8999,
      image: "https://www.meals.com/imagesrecipes/144807lrg.jpg"
    }),
    Product.create({
      title: 'Milk Chocolate Strawberries',
      shortDescription: 'tasty strawberries covered in chocolate',
      fullDescription: 'show your love with some delicious strawberries glazed with the most decadent chocolate in the world',
      inventoryQty: 1000,
      pdtWt: 30, // 30 strawberries/box
      priceCents: 9999,
      image: "http://makenmold.com/wp-content/uploads/valentines-day-dipped-strawberries-project-maken-mold.jpg"
    }),
    Product.create({
      title: 'Milk Chocolate Nuts',
      shortDescription: 'rich chocolate nuts',
      fullDescription: 'dazzle your loved one with the best chocolate nuts',
      inventoryQty: 500,
      pdtWt: 24, // 24 chocolates per box
      priceCents: 8999,
      image: "https://3.imimg.com/data3/NF/KI/MY-1126930/nut-cholates-pan-coated-chocolates-500x500.jpg"
    }),
    Product.create({
      title: 'Milk Chocolate Cocoa',
      shortDescription: 'rich chocolate cocoa',
      fullDescription: 'dazzle your loved one with the best chocolate cocoa',
      inventoryQty: 500,
      pdtWt: 24, // 24 chocolates per box
      priceCents: 8999,
      image: "http://www.honeyandbirch.com/wp-content/uploads/2014/01/slow-cookier-kahlua-hot-cocoa-fi.jpg"
    }),
    Product.create({
      title: 'Milk Chocolate Cookies',
      shortDescription: 'rich chocolate cookies',
      fullDescription: 'dazzle your loved one with the best chocolate truffles',
      inventoryQty: 500,
      pdtWt: 24, // 24 chocolates per box
      priceCents: 8999,
      image: "https://www.averiecooks.com/wp-content/uploads/2015/08/cowboycookies-10.jpg"
    }),
    Product.create({
      title: 'White Chocolate Strawberries',
      shortDescription: 'rich chocolate strawberries',
      fullDescription: 'dazzle your loved one with the best chocolate cocoa',
      inventoryQty: 500,
      pdtWt: 24, // 24 chocolates per box
      priceCents: 8999,
      image: "http://www.gifttree.com/images/gt_large/22150a_White-Belgium-Chocolate-Covered-Strawberries.jpg"
    }),
    Product.create({
      title: 'White Chocolate Bars',
      shortDescription: 'rich chocolate bars',
      fullDescription: 'dazzle your loved one with the best chocolate truffles',
      inventoryQty: 500,
      pdtWt: 24, // 24 chocolates per box
      priceCents: 8999,
      image: "https://ameliaschocolate.co.uk/wp-content/uploads/2015/09/white-bar-02.jpg"
    }),
    Product.create({
      title: 'Rose Gummies',
      shortDescription: 'real sour gummies',
      fullDescription: 'pucker up these gummies are the most sour your taste buds have ever come across',
      inventoryQty: 200,
      pdtWt: 50, // 50 gummies per bag
      priceCents: 5999,
      image: "https://uz71pyzpz0-flywheel.netdna-ssl.com/wp-content/uploads/2016/08/rose-champagne-gummy-bears-19.jpg"
    }),
    Product.create({
      title: 'Cake Lollipops',
      shortDescription: 'lollies that you keep eatin',
      fullDescription: 'the most luscious lollipops youve ever licked, lick it up',
      inventoryQty: 700,
      pdtWt: 10, // 10 lollipops/bundle
      priceCents: 4999,
      image: "https://i5.walmartimages.com/asr/46538902-f1a3-4971-b0ff-b133c7bfe688_1.256d501a4ecc130a3fd0be7a8d218fb2.jpeg"
    }),
    Product.create({
      title: 'Rainbow Swirl Lollipops',
      shortDescription: 'get lost in dat rainbow swirl tho',
      fullDescription: 'the most luscious lollipops youve ever licked, lick it up',
      inventoryQty: 700,
      pdtWt: 10, // 10 lollipops/bundle
      priceCents: 4999,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw6FVkisYXXbc9v0ElcoFUuPUo6S9XrdhFA_QEQtVvzVkfdjr4JQ"
    }),
    Product.create({
      title: 'Gourmet Sundae Ice Cream',
      shortDescription: 'the most velvety creamy ice cream',
      fullDescription: 'this ice icream is what dreams are made of, you cant get enough of it',
      inventoryQty: 100,
      pdtWt: 10,
      priceCents: 4999,
      image: "https://cdn.vox-cdn.com/thumbor/ovFsnWdYIwSRss1SNDl0KF9TC_g=/275x0:4720x3334/1200x900/filters:focal(275x0:4720x3334)/cdn.vox-cdn.com/uploads/chorus_image/image/54866387/Pratt_Seattle_Cookie_Counter_12.0.0.jpg"
    }),
    Product.create({
      title: 'Martini Glass Ice Cream',
      shortDescription: 'the most velvety creamy ice cream',
      fullDescription: 'this ice icream is what dreams are made of, you cant get enough of it',
      inventoryQty: 100,
      pdtWt: 10,
      priceCents: 4999,
      image: "http://www.visiterlafrique.com/wp-content/uploads/2016/04/www.visiterlafrique.com-Abidjan-Festival-des-glaces_4.jpeg"
    }),
    Product.create({
      title: 'Ice Cream Cake',
      shortDescription: 'the most velvety creamy ice cream',
      fullDescription: 'this ice icream is what dreams are made of, you cant get enough of it',
      inventoryQty: 100,
      pdtWt: 10,
      priceCents: 4999,
      image: "https://img.buzzfeed.com/video-api-prod/assets/8d9f5d51fa584fd6ad1c6ebe70c415d9/BFV23450_FB.jpg?output-format=webp&output-quality=60&resize=1000:*"
    }),
    Product.create({
      title: 'Ice Cream Sandwiches',
      shortDescription: 'the most velvety creamy ice cream',
      fullDescription: 'this ice icream is what dreams are made of, you cant get enough of it',
      inventoryQty: 100,
      pdtWt: 10,
      priceCents: 4999,
      image: "http://www.panlasangpinoyrecipes.com/wp-content/uploads/2013/09/Ice-Cream-Sandwich.jpg"
    }),
    Product.create({
      title: 'Strawberry Infused Cupcakes',
      shortDescription: 'yummy bite sized strawberry cakes',
      fullDescription: 'this cake is what dreams are made of, you cant get enough of it',
      inventoryQty: 100,
      pdtWt: 10,
      priceCents: 4999,
      image: "https://elanaspantry.com/wp-content/uploads/2011/04/strawberry-cupcakes-gluten-free-elana-amsterdam-web1.jpg"
    }),
    Product.create({
      title: 'Chocolate Decadence Cupcakes',
      shortDescription: 'yummy bite sized chocolate cakes',
      fullDescription: 'this cake is what dreams are made of, you cant get enough of it',
      inventoryQty: 100,
      pdtWt: 10,
      priceCents: 4999,
      image: "https://iambaker.net/wp-content/uploads/2015/09/chocolate-cupcake.jpg"
    }),
  ]);

  let categories = await Promise.all([
    Category.create({name: 'Dark Chocolate', description: 'candy that contains dark chocolate'}),
    Category.create({name: 'Milk Chocolate', description: 'candy that contains milk chocolate'}),
    Category.create({name: 'White Chocolate', description: 'candy that contains white chocolate'}),
    Category.create({name: 'Lollipops', description: 'candy on sticks'}), // 1
    Category.create({name: 'Nuts', description: 'candy that contains nuts'}), // 1
    Category.create({name: 'Gummies', description: 'chewy candy'}), // 1
    Category.create({name: 'Ice Cream', description: 'candy that is creamy and cold'}), // 1
    Category.create({name: 'Cupcakes', description: 'yummy bite size cupcakes'}), // 1
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
