import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {ProductCardView} from '../index.js';
import {Button, Icon} from 'react-materialize'
import {Link} from 'react-router-dom';
import OrderEdit from './order-edit.jsx'
import { orderShipped } from '../../store/index.js';

export class OrderItem extends Component {
  constructor(props){
    super(props)
  }

  render(){
  const {id, createdAt, shipped, startProcessing, cancel} = this.props.content

  const shippingStatus = date => {
    let curDate = new Date(date);

    if (date === null) {
      return 'Incomplete'
    }
    if (curDate > new Date()) {
      return 'Incomplete'
    }
    if (curDate < new Date()) {
      return 'Complete'
    }
  }

  const orderStatus = (_startProcessing, _cancel) => {
    let d = new Date(_startProcessing)
    if (_cancel !== null){
      return 'Cancelled'
    }
    if (shippingStatus(shipped) === "Complete"){
      return 'Completed'
    }
    if (_startProcessing === null){
      return 'New order'
    }
    if (d < new Date()){
      return 'Order is processing'
    }
    if (d > new Date()){
      return 'New order'
    }

  }

    const products = this.props.products;

    let itemNum = this.props.content.orderlines[0].id - 1;
    return (
      <div>
      <h5>Order: {this.props.content.id}</h5>
        {this.props
          .content
          .orderlines
          .map(orderline => {
            return (
                <div className="row" key={orderline.id}>

                { products && products.map(product => {
                    if (product.id === orderline.productId){
                      return (<ProductCardView key={product.id} product={product} />)
                    }
                })}

                <div className="row" key={id + '-' + orderline.id}>
                    <div className="col s2"> Order ID: {id} <br /> Item Number: {orderline.id - itemNum} <br /> Date: {createdAt}
                    </div>
                    <div className="col s2">
                      Order Status: <br /> {orderStatus(startProcessing, cancel)} <br /> <br />
                      Shipping status: <br /> {shippingStatus(shipped)}
                    </div>
                    <div className="col s2"> Order management <br /> Units: {orderline.qty} <br /> Cost Per Unit: {orderline.totalPrice / orderline.qty} <br /> Total cost: {orderline.totalPrice} <br />
                      <div>
<<<<<<< HEAD
                        <OrderEdit
                        content={this.props.content}
                        products={this.props.products}
                        />
=======
                      {
                        this.props.user.isAdmin ?
                        <OrderEdit content={this.props.content} />
                        :
                        <div />
                      }
>>>>>>> 4bf570eefc529d3fd15580c1e4f46b72d0caa326
                      </div>
                    </div>
                  </div>
                </div>
            )
          })}
      </div>
    )

  }
}

const mapState = state => {
  return {orders: state.orders,
          products: state.products,
          user: state.user
        };
}


export default connect(mapState, null)(OrderItem)

