import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ProductCardView} from '../index.js';
import { fetchCartProducts, createNewOrder, clearCart, sendConformationEmail } from '../../store/index.js'

// need to add prop components into ProductCardView

import {OrderPrevItem} from './orderPrevItem.jsx';
import {Table, Button} from 'react-materialize';

export class Confirmation extends Component {

  constructor(props) {
    super(props);
    this.submitClickHandler = this.submitClickHandler.bind(this)
  }

  componentDidMount() {
    this.props.clearShoppingCart()
    if (this.props.shippingInfo.email){
      this.props.sendEmail(this.props.shippingInfo.email);
    }
  }

  submitClickHandler(){
    this.props.history.push('/');
  }

  render() {

    return (
      <div className="center-align">
      <br />
      <img
      className="responsive-img"
      src="/../../../images/thankyouForShopping.gif" />
      <br />
      <h5> An email will be sent to you soon! </h5>
      <p>{this.props.shippingInfo.email}</p>
      <br />
      <Button
      name="Back"
      waves="light"
      style={{
        marginLeft: '15px',
        marginRight: '15px'
    }}
    onClick={this.submitClickHandler}>Go back to shopping</Button>
      </div>

    )
  }

}

const mapStateToProps = state => {
  return {cartItems: state.cartItems, cartPrices: state.cartPrices, shippingInfo: state.shippingInfo, user: state.user};
};

const mapDispatchToProps = dispatch => {
  return {
    sendEmail(email) {
      dispatch(sendConformationEmail(email));
    },
    newOrderMade(data) {
      dispatch(createNewOrder(data));
    },
    clearShoppingCart(){
      dispatch(clearCart());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
