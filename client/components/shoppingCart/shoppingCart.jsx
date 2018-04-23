import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchCartProducts} from '../../store/index.js'
import { ProductCardView } from '../index.js';
import {fetchProducts} from '../../store/index.js'
import { createNewOrder } from '../../store/index.js'

// need to add prop components into ProductCardView

import { CartItem } from './cartItem.jsx';
import { Table, Button } from 'react-materialize';

export class ShoppingCart extends Component {
  constructor(props){
    super(props);
    this.submitClickHandler = this.submitClickHandler.bind(this);
  }

  componentDidMount() {
    this.props.loadCartProducts();

  }
  
  submitClickHandler = () => {
    const {user} = this.props
    console.log('we were clicked!')
    console.log(this.props, ' the props are')
    const orderToAdd = {
      userId: user.id
    }
    console.log(" LETS DEBUG")
    console.log("create order anbd typeof ", typeof createNewOrder, createNewOrder)
    this.props.newOrderMade(orderToAdd);
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


    if ( cartItems.length ){

    return (
      <div className="center-align">

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
            return (<CartItem key={item.id} currentItem={item} />)
          })
          }

        </tbody>

        <thead className="right-align">
          <tr>
          <th>
        <Button waves='light'>Update Cart</Button>
          </th>
        <th className="right-align" data-field="Sub Total">Sub Total: ${sum}  </th>
          </tr>
        </thead>
        </table>

      <Button waves='light' style={{marginRight: '15px'}}>Go back to shopping</Button>
      <Button waves='light' style={{marginLeft: '15px'}} onClick={this.submitClickHandler}>Check Out</Button>

          </div>

    );
  } else {
    return(
      <div className="center-align container">
        <img className="responsive-img" src="/../../../images/empty_cart_800x600_dribbble.png" />
      </div>
    )}
}

}

const mapStateToProps = state => {
  return {
    cartItems: state.cartItems,
    cartPrices: state.cartPrices,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCartProducts() {
      dispatch(fetchCartProducts());
    },
    newOrderMade(data) {
      dispatch(createNewOrder(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart);
