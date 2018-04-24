import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchOrders, orderShipped} from '../../store'
import OrderItem from './order-item.jsx'
import { fetchProducts } from './../../store/index.js'
import categories from '../../store/categories';
import AdminSort from './admin-sort.jsx'
import { withRouter } from 'react-router-dom'


// import {Link} from 'react-router-dom' import {logout} from '../store'

export class OrderView extends Component {
  constructor(props){
    super(props)
    this.handleCategory = this.handleCategory.bind(this)
    this.changeCat = this.changeCat.bind(this)
    this.state = {
      category: 5,
    }
    
  }
  componentDidMount() {
    this
      .props
      .getOrders();

      console.log('here our this is ,', this);
      // this.setState({
      //   reallyToRun: this.props.toRun
      // })
      // if (this.props.location.pathname === '/orders/all'){
      //   console.log('we in')
      //   this.handleCategory(5, this.props)
      // }
    }

  changeCat(num){
    console.log('changing num: ', num)
    this.setState({
      category: num
    })
  }
  handleCategory(cat, orders = []){

    // console.log('firing handle cat', orders.length)
    let newFilteredOrders = [];
    if (cat === 1) {
    newFilteredOrders = orders.filter(order => {
      console.log('outer')
      if (order.cancel === null && order.startProcessing === null){
        return order
      }
      else {
        return false;
      }
    })
    // this.props.history.push('/orders/new')      
    }
    else if (cat === 2) {
      newFilteredOrders = orders.filter(order => {
        if (order.cancel === null && order.startProcessing !== null){
          return order
        }
        else {
          return false;
        }
      })
      // this.props.history.push('/orders/processing')
    }
    else if (cat === 3) {
      newFilteredOrders = orders.filter(order => {
        if (order.cancel !== null){
          return order
        }
        else {
          return false;
        }
      })
      // this.props.history.push('/orders/canceled')
    }
    else if (cat === 4) {
      newFilteredOrders = orders.filter(order => {
        if (order.cancel === null && order.shipped !== null){
          return order
        }
        else {
          return false;
        }
      })
      // this.props.history.push('/orders/completed')
      
    }
    else if (cat === 5) {
    newFilteredOrders = this.props.orders;
    // this.props.history.push('/orders/all')
    }
    return newFilteredOrders;
  }

  render() {
    // console.log('start of our redner, the this is : ', this)
    let orders = this.props.orders ? this.handleCategory(this.state.category, this.props.orders) : [];
    const products = this.props.products ? this.props.products : [];
    return (
      <div>
        <div>
       { orders.length
        ?
        (<AdminSort handleCatSelect={this.changeCat} orders={orders} />)
        :
        (<div />)
        }
        </div>
        {!orders
          ? <div>
              <p>
                There are no orders, select category
              </p>
            </div>
          : <div>
            {orders.map((order) => {
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

const mapDispatch = (dispatch, ownProps) => {
  // console.log('the real ownprops are: ', ownProps)
  return {
    getOrders: () => {
      dispatch(fetchOrders(ownProps.history))
      dispatch(fetchProducts())
    },
    updateOrder: () => {
      dispatch(orderShipped())
    }
  };
}

export default withRouter(connect(mapState, mapDispatch)(OrderView));

/**
 * PROP TYPES
 */
// Navbar.propTypes = {   handleClick: PropTypes.func.isRequired,   isLoggedIn:
// PropTypes.bool.isRequired }
