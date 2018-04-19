import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

import { Button, Card, Row, Col, NavItem, Dropdown, Icon, Navbar as NavBar } from 'react-materialize';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>

    <nav>
    <div className="nav-wrapper">
    <a href="/" className="brand-logo">Logo</a>

    <ul id="nav-mobile" className="right hide-on-med-and-down">


      <li>
      {isLoggedIn ? (
        <Dropdown
        rigger={
        <a>Account<i className="material-icons right">arrow_drop_down</i></a>
        }
        options={{belowOrigin: true, hover: true}}
        >
        <NavItem>My Account</NavItem>
        <NavItem>My Orders</NavItem>
        <NavItem>Logout</NavItem>
      </Dropdown>
    ) : (
      <Dropdown
      trigger={
        <a>Account<i className="material-icons right">arrow_drop_down</i></a>
         }
         options={{belowOrigin: true, hover: true}}
         >
        <NavItem href="/login">Login</NavItem>
        <NavItem href="/signup">Signup</NavItem>

        <NavItem href="/#">My Account</NavItem>
        <NavItem href="/#">My Orders</NavItem>
      </Dropdown>
    )}
    </li>
      <li><a href="#"><i className="material-icons left">shopping_cart</i>1 ITEM</a></li>
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
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
