import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
// const REMOVE_ORDER = 'REMOVE_ORDER'

/**
 * INITIAL STATE
 */
const defaultOrder = []

/**
 * ACTION CREATORS
 */
const getOrders = orders => ({type: GET_ORDERS, orders})
// const removeOrder = () => ({type: REMOVE_ORDER})

/**
 * THUNK CREATORS
 */
export const fetchOrders = () =>
  dispatch =>
    axios.get('/api/orders')
      .then(res => {
        dispatch(getOrders(res.data))}
    )
      .catch(err => console.log(err))

// export const auth = (email, password, method) =>
//   dispatch =>
//     axios.post(`/auth/${method}`, { email, password })
//       .then(res => {
//         dispatch(getOrders(res.data))
//         history.push('/home')
//       }, authError => { // rare example: a good use case for parallel (non-catch) error handler
//         dispatch(getOrders({error: authError}))
//       })
//       .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

// export const logout = () =>
//   dispatch =>
//     axios.post('/auth/logout')
//       .then(_ => {
//         dispatch(removeOrder())
//         history.push('/login')
//       })
//       .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultOrder, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    // case REMOVE_ORDER:
    //   return defaultOrder
    default:
      return state
  }
}
