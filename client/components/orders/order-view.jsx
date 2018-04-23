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
    }
  }
  componentDidMount() {
    this
      .props
      .getOrders();


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
    }
    else if (cat === 5) {
    orders = this.props.orders;
    }
    this.setState({
      filteredOrders: orders
    })
  }

  render() {
    let orders = this.props.orders ? this.props.orders : [];
    const products = this.props.products ? this.props.products : [];

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
        {!this.state.filteredOrders.length
          ? <div>
              <p>
                There are no orders, select category
              </p>
            </div>
          : <div>
            {this.state.filteredOrders.map((order) => {
              return (<OrderItem content={order} products={products} key={order.id} />)
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
