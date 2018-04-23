import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'
const UPDATE_ORDER = 'UPDATE_ORDER'

const defaultOrder = []

const getOrders = orders => ({type: GET_ORDERS, orders})
const updateOrder = order => ({type: UPDATE_ORDER, order})


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

export function callOrderUpdate(id, updates) {
  console.log('called thunk', id)
  return function thunk(dispatch) {
    console.log('about to axios put these updates', updates);
    return axios.put(`/api/admin/orders/${id}`, updates)
    .then(res => {
      console.log('attempting promise')
      return res.data})
    .then(update => {
      dispatch(fetchOrders());
    })
    .catch(err => console.error(err));
  };
}


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
