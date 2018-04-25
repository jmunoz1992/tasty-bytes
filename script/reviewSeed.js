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
const {Review} = require('../server/db/models')

async function seed () {
  await db.sync()
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const reviews = await Promise.all([
    Review.create({
      title: 'chocolate strawberries are so good. 10/10 will buy more',
      content: 'Powder sesame snaps gummies sugar plum donut cotton candy. Carrot cake candy pie gingerbread candy sesame snaps. Gummies apple pie toffee.',
      numStars: 5,
      imgUrl: 'https://orig00.deviantart.net/d74a/f/2012/261/2/5/profile_picture_by_fairie_fancy_candies-d5f5ku4.jpg',
      productId: 1,
      userId: 1,
    }),
    Review.create({
      title: 'Chupa chups brownie cupcake tart marshmallow',
      content: 'Tart cake chocolate bar sesame snaps cake cheesecake chocolate cake cookie candy canes. Cupcake muffin candy canes. Chocolate cookie cupcake chocolate bar pastry sweet roll. Chocolate biscuit candy canes toffee dessert wafer oat cake gummi bears cake.',
      numStars: 5,
      productId: 1,
      userId: 2,
    }),
    Review.create({
      title: 'Wafer biscuit marshmallow wafer',
      content: 'Pie chocolate cake chocolate bar halvah sweet roll tart. Bonbon jujubes sweet roll soufflé gummies soufflé fruitcake toffee lollipop. Soufflé soufflé ice cream oat cake. Dragée tiramisu tiramisu chupa chups carrot cake.',
      numStars: 3,
      imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/41pROFiH3fL.jpg',
      productId: 3,
      userId: 4,
    }),
    Review.create({
      title: 'Cookie cake biscuit sweet dessert sweet roll',
      content: 'Liquorice toffee donut. Jelly-o sesame snaps sweet tart tiramisu gingerbread jelly-o dragée. Donut pie sweet chupa chups marshmallow pastry gummi bears chocolate cake cotton candy. Jelly-o caramels chocolate pastry croissant brownie lemon drops.',
      numStars: 3,
      productId: 2,
      userId: 5,
    }),
    Review.create({
      title: 'Carrot cake brownie chocolate carrot cake sugar plum pastry biscuit dragée cupcake',
      content: 'Marshmallow toffee topping biscuit marzipan candy canes gummies muffin liquorice. Macaroon chocolate bar dessert candy apple pie cotton candy jelly-o jelly beans. Gingerbread jujubes cotton candy. Pie cake gummi bears toffee carrot cake. Cake candy caramels cotton candy. Candy canes sesame snaps tiramisu jelly danish marzipan tiramisu soufflé. Jujubes sugar plum marzipan ice cream biscuit.',
      numStars: 5,
      productId: 5,
      userId: 3,
    }),
    Review.create({
      title: 'chocolate strawberries are so good. 10/10 will buy more',
      content: 'Powder sesame snaps gummies sugar plum donut cotton candy. Carrot cake candy pie gingerbread candy sesame snaps. Gummies apple pie toffee.',
      numStars: 5,
      imgUrl: 'https://orig00.deviantart.net/d74a/f/2012/261/2/5/profile_picture_by_fairie_fancy_candies-d5f5ku4.jpg',
      productId: 6,
      userId: 1,
    }),
    Review.create({
      title: 'Chupa chups brownie cupcake tart marshmallow',
      content: 'Tart cake chocolate bar sesame snaps cake cheesecake chocolate cake cookie candy canes. Cupcake muffin candy canes. Chocolate cookie cupcake chocolate bar pastry sweet roll. Chocolate biscuit candy canes toffee dessert wafer oat cake gummi bears cake.',
      numStars: 2,
      productId: 6,
      userId: 2,
    }),
    Review.create({
      title: 'Wafer biscuit marshmallow wafer',
      content: 'Pie chocolate cake chocolate bar halvah sweet roll tart. Bonbon jujubes sweet roll soufflé gummies soufflé fruitcake toffee lollipop. Soufflé soufflé ice cream oat cake. Dragée tiramisu tiramisu chupa chups carrot cake.',
      numStars: 3,
      imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/41pROFiH3fL.jpg',
      productId: 7,
      userId: 4,
    }),
    Review.create({
      title: 'Cookie cake biscuit sweet dessert sweet roll',
      content: 'Liquorice toffee donut. Jelly-o sesame snaps sweet tart tiramisu gingerbread jelly-o dragée. Donut pie sweet chupa chups marshmallow pastry gummi bears chocolate cake cotton candy. Jelly-o caramels chocolate pastry croissant brownie lemon drops.',
      numStars: 3,
      productId: 8,
      userId: 5,
    }),
    Review.create({
      title: 'Carrot cake brownie chocolate carrot cake sugar plum pastry biscuit dragée cupcake',
      content: 'Marshmallow toffee topping biscuit marzipan candy canes gummies muffin liquorice. Macaroon chocolate bar dessert candy apple pie cotton candy jelly-o jelly beans. Gingerbread jujubes cotton candy. Pie cake gummi bears toffee carrot cake. Cake candy caramels cotton candy. Candy canes sesame snaps tiramisu jelly danish marzipan tiramisu soufflé. Jujubes sugar plum marzipan ice cream biscuit.',
      numStars: 5,
      productId: 8,
      userId: 3,
    }),
    Review.create({
      title: 'chocolate strawberries are so good. 10/10 will buy more',
      content: 'Powder sesame snaps gummies sugar plum donut cotton candy. Carrot cake candy pie gingerbread candy sesame snaps. Gummies apple pie toffee.',
      numStars: 5,
      imgUrl: 'https://orig00.deviantart.net/d74a/f/2012/261/2/5/profile_picture_by_fairie_fancy_candies-d5f5ku4.jpg',
      productId: 8,
      userId: 1,
    }),
    Review.create({
      title: 'Chupa chups brownie cupcake tart marshmallow',
      content: 'Tart cake chocolate bar sesame snaps cake cheesecake chocolate cake cookie candy canes. Cupcake muffin candy canes. Chocolate cookie cupcake chocolate bar pastry sweet roll. Chocolate biscuit candy canes toffee dessert wafer oat cake gummi bears cake.',
      numStars: 2,
      productId: 8,
      userId: 2,
    }),
    Review.create({
      title: 'Wafer biscuit marshmallow wafer',
      content: 'Pie chocolate cake chocolate bar halvah sweet roll tart. Bonbon jujubes sweet roll soufflé gummies soufflé fruitcake toffee lollipop. Soufflé soufflé ice cream oat cake. Dragée tiramisu tiramisu chupa chups carrot cake.',
      numStars: 3,
      imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/41pROFiH3fL.jpg',
      productId: 9,
      userId: 4,
    }),
    Review.create({
      title: 'Cookie cake biscuit sweet dessert sweet roll',
      content: 'Liquorice toffee donut. Jelly-o sesame snaps sweet tart tiramisu gingerbread jelly-o dragée. Donut pie sweet chupa chups marshmallow pastry gummi bears chocolate cake cotton candy. Jelly-o caramels chocolate pastry croissant brownie lemon drops.',
      numStars: 3,
      productId: 9,
      userId: 5,
    }),
    Review.create({
      title: 'Carrot cake brownie chocolate carrot cake sugar plum pastry biscuit dragée cupcake',
      content: 'Marshmallow toffee topping biscuit marzipan candy canes gummies muffin liquorice. Macaroon chocolate bar dessert candy apple pie cotton candy jelly-o jelly beans. Gingerbread jujubes cotton candy. Pie cake gummi bears toffee carrot cake. Cake candy caramels cotton candy. Candy canes sesame snaps tiramisu jelly danish marzipan tiramisu soufflé. Jujubes sugar plum marzipan ice cream biscuit.',
      numStars: 1,
      productId: 10,
      userId: 3,
    }),
    Review.create({
      title: 'chocolate strawberries are so good. 10/10 will buy more',
      content: 'Powder sesame snaps gummies sugar plum donut cotton candy. Carrot cake candy pie gingerbread candy sesame snaps. Gummies apple pie toffee.',
      numStars: 5,
      imgUrl: 'https://orig00.deviantart.net/d74a/f/2012/261/2/5/profile_picture_by_fairie_fancy_candies-d5f5ku4.jpg',
      productId: 11,
      userId: 1,
    }),
    Review.create({
      title: 'Chupa chups brownie cupcake tart marshmallow',
      content: 'Tart cake chocolate bar sesame snaps cake cheesecake chocolate cake cookie candy canes. Cupcake muffin candy canes. Chocolate cookie cupcake chocolate bar pastry sweet roll. Chocolate biscuit candy canes toffee dessert wafer oat cake gummi bears cake.',
      numStars: 2,
      productId: 11,
      userId: 2,
    }),
    Review.create({
      title: 'Wafer biscuit marshmallow wafer',
      content: 'Pie chocolate cake chocolate bar halvah sweet roll tart. Bonbon jujubes sweet roll soufflé gummies soufflé fruitcake toffee lollipop. Soufflé soufflé ice cream oat cake. Dragée tiramisu tiramisu chupa chups carrot cake.',
      numStars: 3,
      imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/41pROFiH3fL.jpg',
      productId: 11,
      userId: 4,
    }),
    Review.create({
      title: 'Cookie cake biscuit sweet dessert sweet roll',
      content: 'Liquorice toffee donut. Jelly-o sesame snaps sweet tart tiramisu gingerbread jelly-o dragée. Donut pie sweet chupa chups marshmallow pastry gummi bears chocolate cake cotton candy. Jelly-o caramels chocolate pastry croissant brownie lemon drops.',
      numStars: 3,
      productId: 11,
      userId: 5,
    }),
    Review.create({
      title: 'Carrot cake brownie chocolate carrot cake sugar plum pastry biscuit dragée cupcake',
      content: 'Marshmallow toffee topping biscuit marzipan candy canes gummies muffin liquorice. Macaroon chocolate bar dessert candy apple pie cotton candy jelly-o jelly beans. Gingerbread jujubes cotton candy. Pie cake gummi bears toffee carrot cake. Cake candy caramels cotton candy. Candy canes sesame snaps tiramisu jelly danish marzipan tiramisu soufflé. Jujubes sugar plum marzipan ice cream biscuit.',
      numStars: 5,
      productId: 12,
      userId: 3,
    }),
    Review.create({
      title: 'chocolate strawberries are so good. 10/10 will buy more',
      content: 'Powder sesame snaps gummies sugar plum donut cotton candy. Carrot cake candy pie gingerbread candy sesame snaps. Gummies apple pie toffee.',
      numStars: 5,
      imgUrl: 'https://orig00.deviantart.net/d74a/f/2012/261/2/5/profile_picture_by_fairie_fancy_candies-d5f5ku4.jpg',
      productId: 13,
      userId: 1,
    }),
    Review.create({
      title: 'Chupa chups brownie cupcake tart marshmallow',
      content: 'Tart cake chocolate bar sesame snaps cake cheesecake chocolate cake cookie candy canes. Cupcake muffin candy canes. Chocolate cookie cupcake chocolate bar pastry sweet roll. Chocolate biscuit candy canes toffee dessert wafer oat cake gummi bears cake.',
      numStars: 2,
      productId: 13,
      userId: 2,
    }),
    Review.create({
      title: 'Wafer biscuit marshmallow wafer',
      content: 'Pie chocolate cake chocolate bar halvah sweet roll tart. Bonbon jujubes sweet roll soufflé gummies soufflé fruitcake toffee lollipop. Soufflé soufflé ice cream oat cake. Dragée tiramisu tiramisu chupa chups carrot cake.',
      numStars: 3,
      imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/41pROFiH3fL.jpg',
      productId: 13,
      userId: 4,
    }),
    Review.create({
      title: 'Cookie cake biscuit sweet dessert sweet roll',
      content: 'Liquorice toffee donut. Jelly-o sesame snaps sweet tart tiramisu gingerbread jelly-o dragée. Donut pie sweet chupa chups marshmallow pastry gummi bears chocolate cake cotton candy. Jelly-o caramels chocolate pastry croissant brownie lemon drops.',
      numStars: 3,
      productId: 13,
      userId: 5,
    }),
    Review.create({
      title: 'Carrot cake brownie chocolate carrot cake sugar plum pastry biscuit dragée cupcake',
      content: 'Marshmallow toffee topping biscuit marzipan candy canes gummies muffin liquorice. Macaroon chocolate bar dessert candy apple pie cotton candy jelly-o jelly beans. Gingerbread jujubes cotton candy. Pie cake gummi bears toffee carrot cake. Cake candy caramels cotton candy. Candy canes sesame snaps tiramisu jelly danish marzipan tiramisu soufflé. Jujubes sugar plum marzipan ice cream biscuit.',
      numStars: 5,
      productId: 14,
      userId: 3,
    }),
    Review.create({
      title: 'chocolate strawberries are so good. 10/10 will buy more',
      content: 'Powder sesame snaps gummies sugar plum donut cotton candy. Carrot cake candy pie gingerbread candy sesame snaps. Gummies apple pie toffee.',
      numStars: 5,
      imgUrl: 'https://orig00.deviantart.net/d74a/f/2012/261/2/5/profile_picture_by_fairie_fancy_candies-d5f5ku4.jpg',
      productId: 15,
      userId: 1,
    }),
    Review.create({
      title: 'Chupa chups brownie cupcake tart marshmallow',
      content: 'Tart cake chocolate bar sesame snaps cake cheesecake chocolate cake cookie candy canes. Cupcake muffin candy canes. Chocolate cookie cupcake chocolate bar pastry sweet roll. Chocolate biscuit candy canes toffee dessert wafer oat cake gummi bears cake.',
      numStars: 2,
      productId: 15,
      userId: 2,
    }),
    Review.create({
      title: 'Wafer biscuit marshmallow wafer',
      content: 'Pie chocolate cake chocolate bar halvah sweet roll tart. Bonbon jujubes sweet roll soufflé gummies soufflé fruitcake toffee lollipop. Soufflé soufflé ice cream oat cake. Dragée tiramisu tiramisu chupa chups carrot cake.',
      numStars: 3,
      imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/41pROFiH3fL.jpg',
      productId: 15,
      userId: 4,
    }),
    Review.create({
      title: 'Cookie cake biscuit sweet dessert sweet roll',
      content: 'Liquorice toffee donut. Jelly-o sesame snaps sweet tart tiramisu gingerbread jelly-o dragée. Donut pie sweet chupa chups marshmallow pastry gummi bears chocolate cake cotton candy. Jelly-o caramels chocolate pastry croissant brownie lemon drops.',
      numStars: 3,
      productId: 16,
      userId: 5,
    }),
    Review.create({
      title: 'Carrot cake brownie chocolate carrot cake sugar plum pastry biscuit dragée cupcake',
      content: 'Marshmallow toffee topping biscuit marzipan candy canes gummies muffin liquorice. Macaroon chocolate bar dessert candy apple pie cotton candy jelly-o jelly beans. Gingerbread jujubes cotton candy. Pie cake gummi bears toffee carrot cake. Cake candy caramels cotton candy. Candy canes sesame snaps tiramisu jelly danish marzipan tiramisu soufflé. Jujubes sugar plum marzipan ice cream biscuit.',
      numStars: 5,
      productId: 16,
      userId: 3,
    }),
    Review.create({
      title: 'chocolate strawberries are so good. 10/10 will buy more',
      content: 'Powder sesame snaps gummies sugar plum donut cotton candy. Carrot cake candy pie gingerbread candy sesame snaps. Gummies apple pie toffee.',
      numStars: 5,
      imgUrl: 'https://orig00.deviantart.net/d74a/f/2012/261/2/5/profile_picture_by_fairie_fancy_candies-d5f5ku4.jpg',
      productId: 17,
      userId: 1,
    }),
    Review.create({
      title: 'Chupa chups brownie cupcake tart marshmallow',
      content: 'Tart cake chocolate bar sesame snaps cake cheesecake chocolate cake cookie candy canes. Cupcake muffin candy canes. Chocolate cookie cupcake chocolate bar pastry sweet roll. Chocolate biscuit candy canes toffee dessert wafer oat cake gummi bears cake.',
      numStars: 2,
      productId: 18,
      userId: 2,
    }),
    Review.create({
      title: 'Wafer biscuit marshmallow wafer',
      content: 'Pie chocolate cake chocolate bar halvah sweet roll tart. Bonbon jujubes sweet roll soufflé gummies soufflé fruitcake toffee lollipop. Soufflé soufflé ice cream oat cake. Dragée tiramisu tiramisu chupa chups carrot cake.',
      numStars: 3,
      imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/41pROFiH3fL.jpg',
      productId: 18,
      userId: 4,
    }),
    Review.create({
      title: 'Cookie cake biscuit sweet dessert sweet roll',
      content: 'Liquorice toffee donut. Jelly-o sesame snaps sweet tart tiramisu gingerbread jelly-o dragée. Donut pie sweet chupa chups marshmallow pastry gummi bears chocolate cake cotton candy. Jelly-o caramels chocolate pastry croissant brownie lemon drops.',
      numStars: 3,
      productId: 18,
      userId: 5,
    }),
    Review.create({
      title: 'Carrot cake brownie chocolate carrot cake sugar plum pastry biscuit dragée cupcake',
      content: 'Marshmallow toffee topping biscuit marzipan candy canes gummies muffin liquorice. Macaroon chocolate bar dessert candy apple pie cotton candy jelly-o jelly beans. Gingerbread jujubes cotton candy. Pie cake gummi bears toffee carrot cake. Cake candy caramels cotton candy. Candy canes sesame snaps tiramisu jelly danish marzipan tiramisu soufflé. Jujubes sugar plum marzipan ice cream biscuit.',
      numStars: 1,
      productId: 19,
      userId: 3,
    }),
    Review.create({
      title: 'Carrot cake brownie chocolate carrot cake sugar plum pastry biscuit dragée cupcake',
      content: 'Marshmallow toffee topping biscuit marzipan candy canes gummies muffin liquorice. Macaroon chocolate bar dessert candy apple pie cotton candy jelly-o jelly beans. Gingerbread jujubes cotton candy. Pie cake gummi bears toffee carrot cake. Cake candy caramels cotton candy. Candy canes sesame snaps tiramisu jelly danish marzipan tiramisu soufflé. Jujubes sugar plum marzipan ice cream biscuit.',
      numStars: 5,
      productId: 20,
      userId: 3,
    }),
  ]);
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${reviews.length} reviews`)
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
