const { assert, expect } = require('chai')
const React = require('react')
const enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
import {AllProductsHome} from './all-products.jsx';
import {ProductCardView} from './product-card.jsx'
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';

const {
  Route,
  withRouter,
  MemoryRouter
} = require('react-router-dom')

enzyme.configure({
  adapter: new Adapter()
})


const AllProductsHomeRoute = withRouter(() => {
  return (
    <div>
      <Route
        path="/"
        component={AllProductsHome}
      />
    </div>
  )
})

describe('AllProducts component', () => {
  it(`renders AllProductsHome at path '/'`, () => {
    const wrapper = enzyme.render(
      <MemoryRouter
        initialEntries={['/']}
      >
        <AllProductsHomeRoute />
      </MemoryRouter>
    )
    assert.equal(wrapper.find('#all-products').length, 1)
  })

  it('renders a ProductCardView component', () => {
    const product1 = {
      id: 1,
      title: 'CHOCOLATE STRAWBERRIES',
      shortDescription: 'this is a short description',
      priceActual: '10.99',
    }
    const wrapper = shallow(
      <AllProductsHome
        products={[product1]}
        loadProducts={() => {}}
        loadCart={() => {}}
        updateCart={(id, qty) => {}}
      />
    );
    assert.equal(wrapper.find(ProductCardView).length, 1);
  })

  it('passes in product object prop to ProductCardView component', () => {
    const product1 = {
      id: 1,
      title: 'CHOCOLATE STRAWBERRIES',
      shortDescription: 'this is a short description',
      priceActual: '10.99',
    }

    const wrapper = shallow(
      <AllProductsHome
        products={[product1]}
        loadProducts={() => {}}
        loadCart={() => {}}
        updateCart={(id, qty) => {}}
      />
    );
    assert.equal(wrapper.find(ProductCardView).at(0).props().product, product1);
  })

  it('passes in updateCart function prop to ProductCardView component', () => {
    const updateCartFunc = (id, qty) => {}

    const wrapper = shallow(
      <AllProductsHome
        products={[{}]}
        loadProducts={() => {}}
        loadCart={() => {}}
        updateCart={updateCartFunc}
      />
    );
    assert.equal(wrapper.find(ProductCardView).at(0).props().updateCart, updateCartFunc);
  })
});

