import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchOrders, orderShipped} from '../../store'
import {OrderItem} from './order-item.jsx'
import { fetchProducts } from './../../store/index.js'

// import {Link} from 'react-router-dom' import {logout} from '../store'

export class OrderView extends Component {
  componentDidMount() {
    this
      .props
      .getOrders();

  }
  render() {
    const orders = this.props.orders ? this.props.orders : [];
    const products = this.props.products ? this.props.products : [];
    
    return (
      <div>
        {!orders
          ? <div>
              <p>
                There are no orders in the database
              </p>
            </div>
          : <div>
            {orders.map((order) => {
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

export default connect(mapState, mapDispatch)(OrderView)

/**
 * PROP TYPES
 */
// Navbar.propTypes = {   handleClick: PropTypes.func.isRequired,   isLoggedIn:
// PropTypes.bool.isRequired }