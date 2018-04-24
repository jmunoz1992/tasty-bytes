import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'
const UPDATE_ORDER = 'UPDATE_ORDER'
const CREATE_ORDER = 'CREATE_ORDER'

const defaultOrder = []

const getOrders = orders => ({type: GET_ORDERS, orders})
const updateOrder = order => ({type: UPDATE_ORDER, order})
const createOrder = order => ({type: CREATE_ORDER, order})

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

export function callOrderUpdate(id, updates, history) {
  console.log('history :', history)
  console.log('called thunk', id)
  return function thunk(dispatch) {
    console.log('about to axios put these updates', updates);
    return axios.put(`/api/admin/orders/${id}`, updates)
    .then(res => {
      console.log('attempting promise')
      return res.data})
    .then(update => {
      dispatch(fetchOrders());
      history.push('/');
    })
    .catch(err => console.error(err));
  };
}

export function createNewOrder(data){
  console.log('about to create with ', data)
    return function thunk(dispatch){
      return axios.post(`/api/admin/orders`, data)
      .then(res => {
        return res.data})
        //may want to call update on this and fetch somethinbg
      .catch(err => console.error(err));
      }
}

export default function (state = defaultOrder, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case UPDATE_ORDER:
      return action.order
    case CREATE_ORDER:
      return action.order
    // case REMOVE_ORDER:
    //   return defaultOrder
    default:
      return state
  }
}
