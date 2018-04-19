import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

import { Button, Card, Row, Col, NavItem, Dropdown } from 'react-materialize';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
  {/* Dropdown Structure */}
  {isLoggedIn ? (
    <ul id="accountDropdown" className="dropdown-content">
      <li><a href="#!">My Account</a></li>
      <li><a href="#!">Orders</a></li>
      <li><a href="#!">Logout</a></li>
    </ul>
  ) : (
    <ul id="accountDropdown" className="dropdown-content">
      <li><a href="#!">Login</a></li>
      <li><a href="#!">Sign Up</a></li>
    </ul>
  )}

  {/* Dropdown Structure ends */}
    <nav>
    <div className="nav-wrapper">
    <Link to={'/'}>TASTY BYTES</Link>
    <ul id="nav-mobile" className="right hide-on-med-and-down">
      {/* <li><a className="dropdown-trigger" href="#!" data-target="accountDropdown">Account<i className="material-icons right">arrow_drop_down</i></a></li> */}
      <li>
      <Dropdown trigger={
        <Button>Drop me!</Button>
      }>
      <NavItem>one</NavItem>
      <NavItem>two</NavItem>
      <NavItem divider />
      <NavItem>three</NavItem>
    </Dropdown>
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
