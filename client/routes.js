import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Login,
  Signup,
  UserHome,
  AllProductsHome,
  AddProduct,
  OrderView,
  UserReviews,
  AllUsers,
  AllCategories,
  ShoppingCart,
  SingleProduct,
  Checkout,
  OrderPreview,
  conformationEmail,
  Confirmation,
  CategorySelected

}
  from './components'



import { me, fetchCartProducts, fetchProducts } from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.loadMe();
  }


  render() {
    const { isLoggedIn } = this.props
    return (
      <Switch>
        {
          isLoggedIn &&
            <Switch>
              <Route exact path="/orders" component={OrderView} />
              <Route exact path="/orders/all" component ={OrderView} />
              <Route exact path="/orders/new" component={OrderView} />
              <Route exact path="/orders/processing" component={OrderView} />
              <Route exact path="/orders/completed" component={OrderView} />
              <Route exact path="/orders/canceled" component={OrderView} />
              <Route exact path="/admin/users" component={AllUsers} />
              <Route exact path="/admin/products/add" component={AddProduct} />
              <Route exact path="/products/:id/edit" render={() => <SingleProduct edit={true} /> } />
              <Route exact path="/products/:id" component={SingleProduct} />
              <Route path="/admin/categories" component={AllCategories} />
              <Route path="/users/reviews" component={UserReviews} />
              <Route path="/cart" component={ShoppingCart} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/orderPreview" component={OrderPreview} />
              <Route path="/confirmation" component={Confirmation} />
              <Route exact path="/" component={AllProductsHome} />
            </Switch>
        }
        <Route exact path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={ShoppingCart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orderPreview" component={OrderPreview} />
        <Route path="/confirmation" component={Confirmation} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route exact path="/categories/:id" component={CategorySelected} />
        <Route exact path="/" component={AllProductsHome} />
        {/* Displays our Login component as a fallback */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      // dispatch(fetchOrders());
      dispatch(fetchCartProducts());
      dispatch(fetchProducts())
    },
    loadMe() {
      dispatch(me());
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
