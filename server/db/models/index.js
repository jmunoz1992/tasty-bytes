const User = require('./user')
const Review = require('./review')
const Address = require('./address')
const Category = require('./category')
const Order = require('./order')
const OrderLine = require('./orderline')
const Product = require('./product')

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

// Product-Category associations
Product.belongsToMany(Category, {through: 'ProductCategory'});
Category.belongsToMany(Product, {through: 'ProductCategory'});

//Review associations
// Product.belongsToMany(User, {through: Review});  //trying to decide if we want to do this or not
// User.belongsToMany(Product, {through: Review});  //trying to decide if we want to do this or not
Product.hasMany(Review);
Review.belongsTo(Product);
User.hasMany(Review);
Review.belongsTo(User);


//Orderline Associations
Product.belongsToMany(Order, {through: OrderLine});
Order.belongsToMany(Product, {through: OrderLine});
Product.hasMany(OrderLine);
OrderLine.belongsTo(Product);
Order.hasMany(OrderLine);
OrderLine.belongsTo(Order);

// User-Order association
Order.belongsTo(User);
User.hasMany(Order);

//User Address associations
Address.belongsTo(User, {as: 'AddressOwner', foreignKey: 'userId', constraints: false, allowNull:true, defaultValue:null});
User.hasMany(Address, {as: 'AddressOwner', foreignKey: 'userId', constraints: false, allowNull:true, defaultValue:null});

User.belongsTo(Address, {as: 'UserAddress', foreignKey: 'addressId', constraints: false, allowNull:true, defaultValue:null})
Address.hasOne(User, {as: 'UserAddress', foreignKey: 'addressId', constraints: false, allowNull:true, defaultValue:null})

//Order Address associations
Order.belongsTo(Address, {as: 'shipAddress'})
Address.hasOne(Order, {as: 'shipAddress'})
Order.belongsTo(Address, {as: 'billAddress'})
Address.hasOne(Order, {as: 'billAddress'})


module.exports = {
  User,
  Review,
  Address,
  Category,
  Order,
  OrderLine,
  Product,
}
