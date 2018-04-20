import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ProductCardView } from '../index.js';
import {fetchProducts} from '../../store/index.js'

// need to add prop components into ProductCardView

import { CartItem } from './cartItem.jsx';
import { Table, Button } from 'react-materialize';

export class ShoppingCart extends Component {




  componentDidMount() {
    this.props.loadCartProducts();
  }

  render() {

    const { cartItems } = this.props;

    let sum = cartItems.reduce( (accumulator, currentItem) => {
      return (accumulator + currentItem.currentPrice * currentItem.qty)
    }, 0)

    console.log(sum)

    return (
      <div className="center-align">

      {/*  <h1>ALL PRODUCTS</h1>
        <div className="center-align">
          <div className="row">
            {products && products.map(product => {
              return <ProductCardView key={product.id} product={product} />
            })}
          </div>
        </div>
          */}

          <h3>Your Shopping Cart</h3>
          <br />
          <table >
            <thead>
            <tr>
              <th data-field="pic"></th>
              <th data-field="name">Item Name</th>
              <th data-field="QTY">QTY</th>
              <th data-field="price">Unit Price</th>
              <th data-field="totalPrice">Total</th>
              <th data-field="delete">Delete</th>
            </tr>
          </thead>

          <tbody>

          {cartItems.map( item => {
            return (<CartItem key={item.productId} currentItem={item} />)
          })
          }

        </tbody>

        <thead className="right-align">
        <tr>
        <th>
        <Button waves='light'>Update Cart</Button>
        </th>
        <th className="right-align" data-field="Sub Total">Sub Total: ${sum}</th>
        </tr>
        </thead>
      </table>

      <Button waves='light' style={{marginRight: '15px'}}>Go back to shopping</Button>
      <Button waves='light' style={{marginLeft: '15px'}}>Check Out</Button>

          </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartItems
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
)(ShoppingCart);
