import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchOrders} from '../../store'
import {OrderItem} from '../.'
// import {Link} from 'react-router-dom' import {logout} from '../store'

export class OrderView extends Component {
  componentDidMount() {
    // this
    //   .props
    //   .getOrders()
  }
  render() {
    const ordersAll = this.props.orders ? this.props.orders : [];
    return (
      <div>
        {!orders
          ? <div>
              <p>
                There are no orders in the database
              </p>
            </div>
          : <div>
            {orders.map(order => {
              return (<OrderItem content={order} key={order.id} />)
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
  return {orders: state.orders};
}

const mapDispatch = dispatch => {
  return {
    getOrders: () => {
      dispatch(fetchOrders())
    }
  };
}

export default connect(mapState, mapDispatch)(OrderView)

/**
 * PROP TYPES
 */
// Navbar.propTypes = {   handleClick: PropTypes.func.isRequired,   isLoggedIn:
// PropTypes.bool.isRequired }
