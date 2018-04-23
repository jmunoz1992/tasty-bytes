import axios from 'axios';

// const GET_SHIPPING_INFO = 'GET_SHIPPING_INFO';
const ADD_SHIPPING_INFO = 'ADD_SHIPPING_INFO';

// export const getShippingInfo = function(shippingInfo){

// }  return {
//     type: GET_SHIPPING_INFO,
//     shippingInfo
//   };

export const addShippingInfo = function(shippingInfo){
  console.log(shippingInfo)
  return {
    type: ADD_SHIPPING_INFO,
    shippingInfo
  };
}

export default function reducer(state = [], action){
  switch (action.type) {
    // case GET_SHIPPING_INFO:
    //   return action.shippingInfo;
    case ADD_SHIPPING_INFO:
      return action.shippingInfo;
    default:
      return state;
  }
}
