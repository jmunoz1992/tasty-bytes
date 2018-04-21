import axios from 'axios';

/**
 * INITIAL STATE
 */
const defaultProducts = [];

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';

/**
 * ACTION CREATORS
 */
export const gotProducts = function (inputProducts) {
  return {
    type: GET_PRODUCTS,
    products: inputProducts
  };
};

/**
 * THUNK CREATORS
 */
export function fetchProducts() {
  return function thunk(dispatch) {
    return axios.get('/api/products')
    .then(res => res.data)
    .then(products => {
      dispatch(gotProducts(products));
    });
  };
}

/**
 * REDUCER
 */
export default function reducer(state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return  action.products;

    default:
      return state;
  }
}
