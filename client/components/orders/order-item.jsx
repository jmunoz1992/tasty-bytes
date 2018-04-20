import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {ProductCardView} from '../index.js';
import {Button, Icon} from 'react-materialize'
import {Link} from 'react-router-dom';
import {OrderEdit} from './order-edit.jsx'
import { orderShipped } from '../../store/index.js';

// import {Link} from 'react-router-dom' import {logout} from '../store'

export class OrderItem extends Component {
  constructor(props){
    super(props)
  }
  // componentDidMount() {
  //   this
  //     .props
  //     .getOrders();


  // }

  render(){
  const {id, createdAt, shipped} = this.props.content

  const orderStatus = date => {
    var d = new Date(date);

    if (date === null) {
      return "Incomplete"
    }
    if (d > new Date()) {
      return "Incomplete"
    }
    if (d < new Date()) {
      return "Complete"
    }
  }

    const products = this.props.products;


    let itemNum = this.props.content.orderlines[0].id - 1;
    // console.log('order item props are: ', this.props)
    return (
      <div>
        {this.props
          .content
          .orderlines
          .map(orderline => {
            return (
                <div className="row" key={orderline.id}>

                { products && products.map(product => {
                    if(product.id === orderline.productId){
                      return (<ProductCardView key={product.id} product={product} />)
                    }
                })}

                <div className="row" key={id + '-' + orderline.id}>
                    <div className="col s2"> Order ID: {id} <br /> Item Number: {orderline.id - itemNum} <br /> Date: {createdAt}
                    </div>
                    <div className="col s2">
                      Shipping status: <br /> {orderStatus(shipped)}
                    </div>
                    <div className="col s2"> Order management <br /> Units: {orderline.qty} <br /> Cost Per Unit: {orderline.totalPrice / orderline.qty} <br /> Total cost: {orderline.totalPrice} <br />
                      <div>
                        <OrderEdit />
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
/**
 * CONTAINER
 */
// const mapStateToProps = state => {   return {     products: state.products,
//   reviews: state.reviews   }; }; const mapDispatchToProps = dispatch => {
// return {     loadProducts() {       dispatch(fetchProducts());     },   }; };

const mapState = state => {
  return {orders: state.orders,
          products: state.products
        };
}

const mapDispatch = dispatch => {
  return {
    getOrders: () => {
      dispatch(fetchOrders())
      dispatch(fetchProducts())
    },
    updateOrder: () => {
      dispatch(orderShipped())
    }
  };
}

export default connect(mapState, mapDispatch)(OrderItem)
/**
 * PROP TYPES
 */
// Navbar.propTypes = {   handleClick: PropTypes.func.isRequired,   isLoggedIn:
// PropTypes.bool.isRequired }
