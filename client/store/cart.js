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
    //this is temporary code, will need to update with session stuff for real cart data
    let cartItems = [
      {
        productId: 1,
        productName: 'chocolate strawberries',
        imgUrl: 'https://www.godivachocolates.eu/images/gene/prod/zoom/goch000340_01_godiva-gold-collection-gift-box-34pc.jpg',
        currentPrice: 99.99,
        qty: 1
      },
      {
        productId: 2,
        productName: 'chocolate truffles',
        imgUrl: 'https://www.godivachocolates.eu/images/gene/prod/zoom/goch000340_01_godiva-gold-collection-gift-box-34pc.jpg',
        currentPrice: 89.99,
        qty: 1
      },
      {
        productId: 4,
        productName: 'luscious lollipops',
        imgUrl: 'https://www.godivachocolates.eu/images/gene/prod/zoom/goch000340_01_godiva-gold-collection-gift-box-34pc.jpg',
        currentPrice: 49.99,
        qty: 3
      },
    ]
    dispatch(getCartProducts(cartItems));
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
