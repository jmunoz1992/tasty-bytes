import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import users from './users'
import products from './products'
import orders from './orders'
import cartItems from './cart'
import categories from './categories'
import authMessage from './notAuthMessage'
import cartPrices from './cartPrice'
import reviews from './reviews'
import shippingInfo from './shippingInfo'
import errorMessage from './pop-up'


const reducer = combineReducers({
  user,
  products,
  orders,
  users,
  cartItems,
  categories,
  authMessage,
  cartPrices,
  reviews,
  shippingInfo,
  errorMessage
})



const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './users'
export * from './products'
export * from './orders'
export * from './cart'
export * from './categories'
export * from './notAuthMessage'
export * from './cartPrice'
export * from './reviews'
export * from './shippingInfo'
export * from './email'
export * from './pop-up'

