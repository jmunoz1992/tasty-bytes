/* global describe beforeEach it */
import { expect } from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {ProductCardView} from './product-card.jsx'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('ProductCardView component', () => {
  let productCardHome;

  beforeEach(() => {
    productCardHome = shallow(<ProductCardView
      product = {
        {
          id: 1,
          title: 'CHOCOLATE STRAWBERRIES',
          shortDescription: 'this is a short description',
          priceActual: '10.99',
        }
       } />)
  })

  it('renders the title in a string format', () => {
    const title = productCardHome.find('#title').text();
    expect(title).to.be.equal('CHOCOLATE STRAWBERRIES');
  })

  it('renders the short description in a string format', () => {
    const shortDescrip = productCardHome.find('#shortDescrip').text();
    expect(shortDescrip.trim()).to.be.equal('this is a short description');
  })

  it('renders the priceActual in a string format with dollar sign', () => {
    const priceActual = productCardHome.find('#priceActual').text();
    expect(priceActual.trim()).to.be.equal('$10.99');
  })
})
