import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import users from './users'
import products from './products'
import orders from './orders'
import selectedProducts from './selectedProducts'

const reducer = combineReducers({
  user,
  products,
  orders,
  users,
  selectedProducts,
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
export * from './selectedProducts'
