/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import reducer, {fetchProducts, gotProducts} from './products'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const fakeProducts = [{
  id: 1,
  title: 'CHOCOLATE STRAWBERRIES',
  shortDescription: 'this is a short description',
  priceActual: '10.99',
}, {
  id: 2,
  title: 'CHOCOLATE TRUFFLES',
  shortDescription: 'this is a short description',
  priceActual: '20.99',
}];

describe('Products store', () => {
  describe(`action creator for products returning correct type 'GET_PRODUCTS'`, () => {
    let action = {}

    beforeEach(() => {
      action = gotProducts(fakeProducts)
    })

    it('should return correct type', () => {
      expect(action.type).to.be.equal('GET_PRODUCTS')
    })
  })

  describe('thunk creator for products returning fetchProducts thunk', () => {
    let store
    let mockAxios

    const initialState = {products: []}

    beforeEach(() => {
      mockAxios = new MockAdapter(axios)
      store = mockStore(initialState)
    })

    afterEach(() => {
      mockAxios.restore()
      store.clearActions()
    })

    describe('fetchProducts', () => {
      it('dispatches action to fetch all products from the database', () => {
        mockAxios.onGet('/api/products').replyOnce(200, fakeProducts);
        return store.dispatch(fetchProducts())
          .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).to.be.equal('GET_PRODUCTS')
            expect(actions[0].products).to.be.deep.equal(fakeProducts)
          })
      })
    })
  })

  describe('reducer', () => {
    let state = []
    let products = []

    beforeEach(() => {
      products = fakeProducts;
    })

    describe('GET_PRODUCTS action', () => {
      it('replaces the array of products in state with fetched products', () => {
        const newState = reducer(state, {
          type: 'GET_PRODUCTS',
          products
        })
        expect(newState).to.deep.equal(fakeProducts)
      })
    })
  });
});
