const SELECT_PRODUCT = 'SELECT_PRODUCT';

export const selectProduct = function (inputProduct) {
  return {
    type: SELECT_PRODUCT,
    newProductEntry: inputProduct
  };
};

export default function reducer(state = '', action) {
  switch (action.type) {
    case SELECT_PRODUCT:
      return action.newProductEntry;
    default:
      return state;
  }
}
