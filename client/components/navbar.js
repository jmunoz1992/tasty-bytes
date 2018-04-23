import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { logout } from '../store/user'

import { NavItem, Dropdown, Navbar as NavBar } from 'react-materialize';

export class Navbar extends Component {

  constructor(props){
    super(props)

  }

  render(){

  const { isLoggedIn, user, cartItems, handleClick } = this.props

  return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to={'/'}>TASTY BYTES</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                {(user && user.isAdmin) ? (
                  <Dropdown
                    trigger={
                      <a>Admin Options<i className="material-icons right">arrow_drop_down</i></a>
                    }
                    options={{ belowOrigin: true, hover: true }}
                  >
                    <Link to={'/admin/users'} style={{color: '#26a69a'}}>Users</Link>
                    <Link to={'/orders'} style={{color: '#26a69a'}}>Orders</Link>
                    <Link to={'/products'} style={{color: '#26a69a'}}>Products</Link>
                    <Link to={'/admin/categories'} style={{color: '#26a69a'}}>Product Categories</Link>
                  </Dropdown>
                ) :
                  null
                }
              </li>
              <li>
                {isLoggedIn ? (
                    <Dropdown
                      trigger={
                        <a>Account<i className="material-icons right">arrow_drop_down</i></a>
                      }
                      options={{ belowOrigin: true, hover: true }}
                    >
                      <Link to={'#'} style={{color: '#26a69a'}}>My Account</Link>
                      <Link to={'/orders'} style={{color: '#26a69a'}}>My Orders</Link>
                      <Link to={'#'} onClick={(evt) => handleClick(evt, user)} style={{color: '#26a69a'}}>Logout</Link>
                    </Dropdown>
                ) : (
                    <Dropdown
                      trigger={
                        <a>Account<i className="material-icons right">arrow_drop_down</i></a>
                      }
                      options={{ belowOrigin: true, hover: true }}
                    >
                      <Link to={'/login'} style={{color: '#26a69a'}}>Login</Link>
                      <Link to={'/signup'} style={{color: '#26a69a'}}>Signup</Link>
                    </Dropdown>
                  )}
              </li>
              <li><Link to={'/cart'}><i className="material-icons left">shopping_cart</i>
              {cartItems && cartItems.length ?
                `${cartItems.length} item(s)` : null
              }</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    cartItems: state.cartItems,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick(evt, user) {
      evt.preventDefault();
      return dispatch(logout(user))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar));

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
