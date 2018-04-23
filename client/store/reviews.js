import axios from 'axios';
import {fetchProducts} from '../store'

const GET_REVIEWS = 'GET_REVIEWS';
const NEW_REVIEW = 'NEW_REVIEW';

export const gotReviews = function (reviews) {
  return {
    type: GET_REVIEWS,
    reviews
  };
};

export const newReview = function (review) {
  return {
    type: NEW_REVIEW,
    review
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

export function addReview(review) {
  return function thunk(dispatch) {
    axios.post(`/api/reviews`, review)
    .then(res => res.data)
    .then(createdReview => {
      dispatch(newReview(createdReview));
      dispatch(fetchProducts())
    });
  };
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return  action.reviews;
    case NEW_REVIEW:
      return [...state, action.review];
    default:
      return state;
  }
}
