import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCartProducts} from '../../store/index.js'
import {ProductCardView} from '../index.js';
import {fetchProducts, deleteCartItem, updateQuantity, createNewOrder, clearCart} from '../../store/index.js'

// need to add prop components into ProductCardView

import {CartItem} from './cartItem.jsx';
import {Table, Button} from 'react-materialize';

export class ShoppingCart extends Component {

  constructor(props) {
    super(props);
    this.deleteClickHandler = this
      .deleteClickHandler
      .bind(this)
    this.submitClickHandler = this
      .submitClickHandler
      .bind(this);
  }

  componentDidMount() {
    this
      .props
      .loadCartProducts()
  }

  deleteClickHandler(evt) {
    this
      .props
      .deleteItem(+evt.target.name);
  }

  submitClickHandler(evt){
    if (evt.target.name === 'Checkout'){
      this.props.history.push('/checkout');
    }
    else if (evt.target.name === 'Back'){
      this.props.history.push('/');
    }
    else if (evt.target.name === 'Delete'){
      this.props.clearShoppingCart();
    }
  }


  render() {

    const {cartItems, cartPrices} = this.props;

    if (cartPrices.length) {
      cartItems.forEach(item => {
        let found = cartPrices.find(element => {
          return element.id === item.id;
        })

        if (found) {
          item.currentPrice = Math.round(found.priceCents) / 100;
        }
      })
    }

    let sum = cartItems.reduce((accumulator, currentItem) => {
      return (accumulator + currentItem.currentPrice * currentItem.qty)
    }, 0)

    if (!sum) {
      sum = 0;
    }

    if (cartItems.length) {

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

              {cartItems.map(item => {
                return (<CartItem
                  key={item.id}
                  currentItem={item}
                  deleteClickHandler={this.deleteClickHandler}
                  updateCart={this.props.updateCart} />)
              })
}

            </tbody>
          </table>
            <div className="container row">


                <div className="right-align" data-field="Sub Total"><b>Sub Total: $ {Number(Math.round(sum * 100) / 100).toFixed(2)}
                </b></div>
              </div>

          <Button
          className="left-align"
          name="Delete"
          waves="light"
          style={{
            marginRight: '15px'
          }}
          onClick={this.submitClickHandler}>Delete Cart</Button>

          <Button
            name="Back"
            waves="light"
            style={{
              marginLeft: '15px',
              marginRight: '15px'
          }}
          onClick={this.submitClickHandler}>Go back to shopping</Button>

          <Button
            name="Checkout"
            waves="light"
            style={{
            marginLeft: '15px'
          }}
            onClick={this.submitClickHandler}>Check Out</Button>

        </div>

      );
    } else {
      return (
        <div className="center-align container">
          <img
            className="responsive-img"
            src="/../../../images/empty_cart_800x600_dribbble.png"/>
        </div>
      )
    }
  }

}

const mapStateToProps = state => {
  return {cartItems: state.cartItems, cartPrices: state.cartPrices, user: state.user};
};

const mapDispatchToProps = dispatch => {
  return {
    loadCartProducts() {
      dispatch(fetchCartProducts());
    },
    deleteItem(id) {
      dispatch(deleteCartItem(id));
    },
    updateCart(id, qty) {
      dispatch(updateQuantity(id, qty));
    },
    newOrderMade(data) {
      dispatch(createNewOrder(data));
    },
    clearShoppingCart(){
      dispatch(clearCart());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
