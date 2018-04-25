import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { logout } from '../store/user'

import { Dropdown, Navbar as NavBar } from 'react-materialize';

export class Navbar extends Component {

  constructor(props){
    super(props)

  }

  render(){

  const { isLoggedIn, user, cartItems, handleClick } = this.props

  let totalItemsInCart = 0;
  if(cartItems) {
    cartItems.map(item => {
      totalItemsInCart += (+item.qty);
    })
  }

  let message = '';
  if(totalItemsInCart === 1) {
    message = `${totalItemsInCart} item`;
  } else if(totalItemsInCart > 1) {
    message = `${totalItemsInCart} items`;
  }

  return (
      <div>
        <nav>
          <div className="brown nav-wrapper">
            <Link to={'/'} style={{'fontSize': '25px', color: '#cfb56a', 'fontFamily': 'Georgia, serif'}}>WELCOME TO TASTY BYTES</Link>
            <ul id="nav-mobile" className="center-align right hide-on-med-and-down">
              <li>
                {(user && user.isAdmin) ? (
                  <Dropdown
                    trigger={
                      <a>Admin Options<i className="material-icons right">arrow_drop_down</i></a>
                    }
                    options={{ belowOrigin: true, hover: true }}
                  >
                    <Link to={'/admin/users'} style={{color: '#cfb56a'}}>Users</Link>
                    <Link to={'/orders'} style={{color: '#cfb56a'}}>Orders</Link>
                    <Link to={'/'} style={{color: '#cfb56a'}}>Products</Link>
                    <Link to={'/admin/categories'} style={{color: '#cfb56a'}}>Product Categories</Link>
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
                      <Link to={'/home'} style={{color: '#cfb56a'}}>My Account</Link>
                      <Link to={'/orders'} style={{color: '#cfb56a'}}>My Orders</Link>
                      <Link to={'/users/reviews'} style={{color: '#cfb56a'}}>My Reviews</Link>
                      <Link to={'#'} onClick={(evt) => handleClick(evt, user)} style={{color: '#cfb56a'}}>Logout</Link>
                    </Dropdown>
                ) : (
                    <Dropdown
                      trigger={
                        <a>Account<i className="material-icons right">arrow_drop_down</i></a>
                      }
                      options={{ belowOrigin: true, hover: true }}
                    >
                      <Link to={'/login'} style={{color: '#cfb56a'}}>Login</Link>
                      <Link to={'/signup'} style={{color: '#cfb56a'}}>Signup</Link>
                    </Dropdown>
                  )}
              </li>
              <li><Link to={'/cart'}><i className="material-icons left">shopping_cart</i>
              {cartItems && cartItems.length ?
                message : null
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
