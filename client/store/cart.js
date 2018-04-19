import axios from 'axios';

const GET_CART_PRODUCTS = 'GET_CART_PRODUCTS';

export const getCartProducts = function (cartItems) {
  return {
    type: GET_CART_PRODUCTS,
    cartItems
  };
};


export function fetchCartProducts() {
  return function thunk(dispatch) {
    axios.get(`/api/cart`)
    .then(res => res.data)
    .then(cartItems => {
      dispatch(getCartProducts(cartItems));
    })
    .catch(err => console.error(err));
  };
}

export function addOrUpdateCart(id, qty) {
  if (!qty) qty = 1;
  return function thunk(dispatch) {
    axios.put(`/api/cart`, {id, qty})
    .then(res => res.data)
    .then(cartItems => {
      dispatch(getCartProducts(cartItems));
    })
    .catch(err => console.error(err));
  };
}

export function deleteCartItem(id) {
  return function thunk(dispatch) {
    axios.delete(`/api/cart/${id}`)
    .then(res => res.data)
    .then(cartItems => {
      dispatch(getCartProducts(cartItems));
    })
    .catch(err => console.error(err));
  };
}


export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_CART_PRODUCTS:
      return action.cartItems;
    default:
      return state;
  }
}
