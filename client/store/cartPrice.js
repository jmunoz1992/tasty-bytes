import axios from 'axios';

const GET_CART_PRICES = 'GET_CART_PRICES';

export const getCartPrices = function (cartPrices) {
  return {
    type: GET_CART_PRICES,
    cartPrices
  };
};

export function fetchCartPriceInv(products) {
  return function thunk(dispatch) {
    axios.post(`/api/cart/productInfo`, products)
    .then(res => res.data)
    .then(prices => {
      dispatch(getCartPrices(prices))
    })
    .catch(err => console.error(err));
  };
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_CART_PRICES:
      return action.cartPrices;
    default:
      return state;
  }
}
