import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

import { Button, Card, Row, Col, NavItem, Dropdown, Icon, Navbar as NavBar } from 'react-materialize';

const Navbar = ({ handleClick, isLoggedIn, user, cartItems }) => (
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
                <NavItem href="/admin/users">Users</NavItem>
                <NavItem href="/admin/orders">Orders</NavItem>
                <NavItem href="/products">Products</NavItem>
                <NavItem href="/admin/categories">Product Categories</NavItem>
              </Dropdown>
            ) :
              <div />
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
                <NavItem>My Account</NavItem>
                <NavItem>My Orders</NavItem>
                <NavItem onClick= {(evt) => handleClick(evt, user)} >Logout</NavItem>
              </Dropdown>
            ) : (
                <Dropdown
                  trigger={
                    <a>Account<i className="material-icons right">arrow_drop_down</i></a>
                  }
                  options={{ belowOrigin: true, hover: true }}
                >
                  <NavItem href="/login">Login</NavItem>
                  <NavItem href="/signup">Signup</NavItem>
                </Dropdown>
              )}
          </li>
          <li><NavItem href="/cart"><i className="material-icons left">shopping_cart</i>
          {cartItems && cartItems.length ?
            `${cartItems.length} item(s)` :
            null
          }</NavItem></li>
        </ul>
      </div>
    </nav>


  </div>


)

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

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
