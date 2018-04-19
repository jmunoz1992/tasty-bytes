import axios from 'axios';

const GET_PRODUCTS = 'GET_PRODUCTS';

export const gotProducts = function (inputProducts) {
  return {
    type: GET_PRODUCTS,
    products: inputProducts
  };
};

export function fetchProducts() {
  return function thunk(dispatch) {
    axios.get('/api/products')
    .then(res => res.data)
    .then(products => {
      dispatch(gotProducts(products));
    });
  };
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return  action.products;

    default:
      return state;
  }
}
