import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchCartProducts, addShippingInfo} from '../../store/index.js'
import { ProductCardView } from '../index.js';
import {fetchProducts} from '../../store/index.js'

// need to add prop components into ProductCardView

import { OrderPrevItem } from './orderPrevItem.jsx';
import { Table, Button } from 'react-materialize';

export class OrderPreview extends Component {

  constructor(props){
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    this.props.loadCartProducts();

  }

  clickHandler(evt){
    if (evt.target.name === 'back'){
      this.props.history.push('/')
    }
    else if (evt.target.name === 'editCart'){
      this.props.history.push('/cart')
    }
    else if (evt.target.name === 'editInfo'){
      this.props.history.push('/checkout')
    }
    else if (evt.target.name === 'submit'){
      //submit order here
      console.log('submit order')
    }
  }

  render() {

    const { cartItems, cartPrices } = this.props;

    if (cartPrices.length){
      cartItems.forEach( item => {
        let found = cartPrices.find(element => {
          return element.id === item.id;
        })

        if (found) {
          item.currentPrice = Math.round(found.priceCents) / 100;
        }
      })
    }

    let sum = cartItems.reduce( (accumulator, currentItem) => {
      return (accumulator + currentItem.currentPrice * currentItem.qty)
    }, 0)

    if (!sum){
      sum = 0;
    }

    return (
            <div className="center-align">

          <h3>Order Preview</h3>
          <br />
          <table >
            <thead>
            <tr>
              <th data-field="pic"></th>
              <th data-field="name">Item Name</th>
              <th data-field="QTY">QTY</th>
              <th data-field="price">Unit Price</th>
              <th data-field="totalPrice">Total</th>
            </tr>
          </thead>

          <tbody>

          {cartItems.map( item => {
            return (<OrderPrevItem key={item.id} currentItem={item} />)
          })
          }

        </tbody>

        <thead className="right-align" >
        <tr >
        <th className="right-align" data-field="Sub Total">Sub Total: ${Number(Math.round(sum * 100) / 100).toFixed(2)}  </th>
          </tr>
        </thead>
        </table>

        <br />

        <Button
          name="back"
          waves="light"
          style={{marginRight: '15px'}}
          onClick={this.clickHandler}>
          Go back to shopping
        </Button>

        <Button
          name="editCart"
          waves="light"
          style={{marginRight: '15px', marginLeft: '15px'}}
          onClick={this.clickHandler}>
          Edit Cart
        </Button>

        <Button
          name="editInfo"
          waves="light"
          style={{marginRight: '15px', marginLeft: '15px'}}
          onClick={this.clickHandler}>
          Edit Shipping Info
        </Button>

        <Button
          name="submit"
          waves="light"
          style={{marginLeft: '15px'}}
          onClick={this.clickHandler}>
          Submit Order
        </Button>

          </div>


    )
}

}

const mapStateToProps = state => {
  return {
    cartItems: state.cartItems,
    cartPrices: state.cartPrices,
    shippingInfo: state.shippingInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCartProducts() {
      dispatch(fetchCartProducts());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderPreview);
