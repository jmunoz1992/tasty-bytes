import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Button, Dropdown, NavItem} from 'react-materialize'
// import {Link} from 'react-router-dom';

// import {Link} from 'react-router-dom' import {logout} from '../store'

const OrderEdit = (props) => {

  return (
    <div>
    <Dropdown trigger={
        <Button>Edit me!</Button>
      }>
      <NavItem>Delete</NavItem>
      <NavItem>Mark Shipped</NavItem>
    </Dropdown>

    </div>
  )

}
/**
 * CONTAINER
 */
// const mapStateToProps = state => {   return {     products: state.products,
//   reviews: state.reviews   }; }; const mapDispatchToProps = dispatch => {
// return {     loadProducts() {       dispatch(fetchProducts());     },   }; };

export default connect(null, null)(OrderEdit)

/**
 * PROP TYPES
 */
// Navbar.propTypes = {   handleClick: PropTypes.func.isRequired,   isLoggedIn:
// PropTypes.bool.isRequired }