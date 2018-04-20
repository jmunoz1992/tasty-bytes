import axios from 'axios';

const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_NEW_PRODUCT = 'GET_NEW_PRODUCT'

export const gotProducts = function (inputProducts) {
  return {
    type: GET_PRODUCTS,
    products: inputProducts
  };
};

export const newProduct = function (product) {
  return {
    type: GET_NEW_PRODUCT,
    product: product
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

export function addProduct(product, history) {
  return function thunk(dispatch) {
    axios.post('/api/admin/products/', product)
      .then(res => res.data)
      .then(createdProduct => {
        dispatch(newProduct(createdProduct));
        history.push('/products')
      });
  };
}

export function editProduct(product, history) {
  return function thunk(dispatch) {
    axios.put(`/api/admin/products/${product.id}`, product)
      .then(res => res.data)
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

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case GET_NEW_PRODUCT:
      return [...state, action.product];

    default:
      return state;
  }
}
