import axios from 'axios';
import {newErrorMessage} from './index'

/**
 * INITIAL STATE
 */
const defaultProducts = [];

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_NEW_PRODUCT = 'GET_NEW_PRODUCT'

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
export const newProduct = function (product) {
  return {
    type: GET_NEW_PRODUCT,
    product: product
  };
};


export const fetchProductsByCategoryId = (id) => {
  return function thunk(dispatch) {
    return axios.get(`/api/products/category/${id}`)
      .then(res => res.data)
      .then(productsByCategory => {
          productsByCategory.forEach(product => {
            let total = product.reviews.reduce((sum, review) => {
              return sum + review.numStars
            }, 0)
            if (product.reviews.length === 0) product.avgRating = null;
            else product.avgRating = total / product.reviews.length
          })
          dispatch(gotProducts(productsByCategory))
        })
        .catch(error => console.log(error))
  }
}

export function fetchProducts() {
  return function thunk(dispatch) {
    return axios.get('/api/products')
      .then(res => res.data)
      .then(products => {
        products.forEach(product => {
          let total = product.reviews.reduce((sum, review) => {
            return sum + review.numStars
          }, 0)
          if (product.reviews.length === 0) product.avgRating = null;
          else product.avgRating = total / product.reviews.length
        })
        dispatch(gotProducts(products));
      });
  };
}

export function addProduct(product, history) {
  return function thunk(dispatch) {
    axios.post('/api/admin/products/', product)
      .then(res => res.data)
      .then(createdProduct => {
          dispatch(newProduct(createdProduct));
          history.push('/')
      })
      .catch(error => {
        let message = error.response.data
          if (message.indexOf("title must be unique") > -1) {
            message = "Product name must be unique; please enter a different product name"
          }
          dispatch(newErrorMessage(message))
        console.error(error)
      });
  };
}

export function editProduct(product, history) {
  return function thunk(dispatch) {
    console.log('about to axios')
    console.log( product, history)
    axios.put(`/api/admin/products/${product.id}`, product)
      .then(res => {
        console.log('im inside the edit axios')
        return res.data})
      .then(updatedProduct => {
        dispatch(fetchProducts());
        history.push(`/products/${product.id}`)
      });
  };
}

export function deleteProduct(productId) {
  return function thunk(dispatch) {
    axios.put(`/api/admin/products/${productId}/delete`)
      .then(res => res.data)
      .then(message => {
        console.log(message)
        dispatch(fetchProducts());
      });
  };
}

/**
 * REDUCER
 */
export default function reducer(state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case GET_NEW_PRODUCT:
      return [...state, action.product];
    default:
      return state;
  }
}
