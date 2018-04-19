import axios from 'axios';

const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_REVIEWS = 'GET_REVIEWS';

export const gotProducts = function (inputProducts) {
  return {
    type: GET_PRODUCTS,
    products: inputProducts
  };
};

//I DONT THINK THIS SHOULD BE HERE..IT WILL CAUSE ISSUES -JS
export const gotReviews = function (inputReviews) {
  return {
    type: GET_REVIEWS,
    reviews: inputReviews
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

//I DONT THINK THIS SHOULD BE HERE..IT WILL CAUSE ISSUES -JS
export function fetchReviews(id) {
  return function thunk(dispatch) {
    axios.get(`/api/products/${id}/reviews`)
    .then(res => res.data)
    .then(reviews => {
      dispatch(gotReviews(reviews));
    });
  };
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return  action.products;
    //I DONT THINK THIS SHOULD BE HERE..IT WILL CAUSE ISSUES -JS
    case GET_REVIEWS:
      return  action.reviews;
    default:
      return state;
  }
}
