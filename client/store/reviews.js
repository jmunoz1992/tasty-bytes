import axios from 'axios';

const GET_REVIEWS = 'GET_REVIEWS';

export const gotReviews = function (reviews) {
  return {
    type: GET_REVIEWS,
    reviews
  };
};


export function fetchReviewsByProd(productId) {
  return function thunk(dispatch) {
    axios.get(`/api/products/${productId}/reviews`)
    .then(res => res.data)
    .then(productInfo => {
      let reviews = productInfo.reviews
      dispatch(gotReviews(reviews));
    });
  };
}

export function fetchReviewsByUser(userId) {
  return function thunk(dispatch) {
    axios.get(`/api/users/${userId}/reviews`)
    .then(res => res.data)
    .then(reviews => {
      dispatch(gotReviews(reviews));
    });
  };
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return  action.reviews;
    default:
      return state;
  }
}
