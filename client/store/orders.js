import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const UPDATE_ORDER = 'UPDATE_ORDER'
// const REMOVE_ORDER = 'REMOVE_ORDER'

/**
 * INITIAL STATE
 */
const defaultOrder = []

/**
 * ACTION CREATORS
 */
const getOrders = orders => ({type: GET_ORDERS, orders})
const updateOrder = order => ({type: UPDATE_ORDER, order})

// const removeOrder = () => ({type: REMOVE_ORDER})

/**
 * THUNK CREATORS
 */
export const fetchOrders = () =>
  dispatch =>
    axios.get('/api/admin/orders')
      .then(res => {
        dispatch(getOrders(res.data))}
    )
      .catch(err => console.log(err))

// export const orderShipped = (orderId) =>
// dispatch => {  
//   return axios.put(`/api/admin/orders/${orderId}`)
//     .then(res => {
//       dispatch(updateOrder(res.data))}
//   )
//     .catch(err => console.log(err))
// }
export function orderShipped(id) {
  return function thunk(dispatch) {
    axios.put(`/api/admin/orders${id}`, {id})
    .then(res => res.data)
    .then(cartItems => {
      dispatch(getOrders(cartItems));
    })
    .catch(err => console.error(err));
  };
}

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
    case UPDATE_ORDER:
      return action.order
    // case REMOVE_ORDER:
    //   return defaultOrder
    default:
      return state
  }
}
