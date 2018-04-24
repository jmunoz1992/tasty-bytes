import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchOrders, orderShipped} from '../../store'
import OrderItem from './order-item.jsx'
import { fetchProducts } from './../../store/index.js'
import categories from '../../store/categories';
import AdminSort from './admin-sort.jsx'

// import {Link} from 'react-router-dom' import {logout} from '../store'

export class OrderView extends Component {
  constructor(props){
    super(props)
    this.handleCategory = this.handleCategory.bind(this)

    this.state = {
      filteredOrders: [],
      inititalCat: 5,
    }
  }
  componentDidMount() {
    this
      .props
      .getOrders();

      console.log('here our this is ,', this);
    
    }
  handleCategory(cat, orders){

    if (cat === 1) {
    orders = orders.filter(order => {
      console.log('outer')
      if (order.cancel === null && order.startProcessing === null){
        console.log('inner')
        this.setState({
          filteredOrders: orders
        })
        return order
      }
      else {
        return false;
      }
    })
    this.props.history.push('/orders/newOrders')      
    }
    else if (cat === 2) {
      orders = orders.filter(order => {
        if (order.cancel === null && order.startProcessing !== null){
          return order
        }
        else {
          return false;
        }
      })
      this.props.history.push('/orders/processing')
    }
    else if (cat === 3) {
      orders = orders.filter(order => {
        if (order.cancel !== null){
          return order
        }
        else {
          return false;
        }
      })
      this.props.history.push('/orders/canceled')
    }
    else if (cat === 4) {
      orders = orders.filter(order => {
        if (order.cancel === null && order.shipped !== null){
          return order
        }
        else {
          return false;
        }
      })
      this.props.history.push('/orders/completed')
      
    }
    else if (cat === 5) {
    orders = this.props.orders;
    this.props.history.push('/orders/all')      
    }
    this.setState({
      filteredOrders: orders
    })
  }

  render() {
    // console.log('start of our redner, the this is : ', this)
    let orders = this.props.orders ? this.props.orders : [];
    const products = this.props.products ? this.props.products : [];
    // this.handleCategory (this.state.inititalCat, orders)
    // this.setState({
    //   inititalCat: 10 //arbitrarily high number
    // })

    return (
      <div>
        <div>
       { orders.length
        ?
        (<AdminSort handleCatSelect={this.handleCategory} orders={orders} />)
        :
        (<div />)
        }
        </div>
        {!this.state.filteredOrders
          ? <div>
              <p>
                There are no orders, select category
              </p>
            </div>
          : <div>
            {this.state.filteredOrders.map((order) => {
              return (<OrderItem
                content={order}
                products={products}
                key={order.id}
                handleCategory={this.handleCategory}
                />)
            })}
          </div>
}
      </div>
    )

  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  let filteredOrders = state.orders;
  if (!state.user) filteredOrders = [];
  else if (!state.user.isAdmin) {
    filteredOrders = state.orders.filter(order => {
      return order.userId === state.user.id
    })
  }
  return {orders: filteredOrders,
          products: state.products,
          categories: state.categories,
          user: state.user
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

export default connect(mapState, mapDispatch)(OrderView)

/**
 * PROP TYPES
 */
// Navbar.propTypes = {   handleClick: PropTypes.func.isRequired,   isLoggedIn:
// PropTypes.bool.isRequired }
