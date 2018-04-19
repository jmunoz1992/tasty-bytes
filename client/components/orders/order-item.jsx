import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {ProductCardView} from '../product-card.jsx';
import {Button, Icon} from 'react-materialize'
import {Link} from 'react-router-dom';

// import {Link} from 'react-router-dom' import {logout} from '../store'

const OrderItem = (props) => {
  // const OrderItem = ({ handleClick, isLoggedIn }) => { need to add photo eager
  // loading!
  const {id, createdAt, shipped, arrived} = props.content

  const orderStatus = date => {
    console.log('ionsdie shipping status')
    var d = new Date(date);
    console.log(d, typeof d)
    console.log(date, typeof date)
    console.log(new Date());
    if (d === null) {
      return "Incomplete"
    }
    if (d > new Date()) {
      return "Incomplete"
    }
    if (d < new Date()) {
      return "Complete"
    }
  }

  // export const ProductCardView = (props) => {   const {title, shortDescription,
  // priceActual, image} = props.product;


  const products = props.products;


  let itemNum = props.content.orderlines[0].id - 1;
  return (
    <div>
      {props
        .content
        .orderlines
        .map(orderline => {
          return (
              <div className="row" key={orderline.id}>

              { products && products.map(product => {
                  if(product.id === orderline.productId){
                    return (<ProductCardView key={product.id} product={product} />)
                  }
              })}

              <div className="row" key={id + '-' + orderline.id}>
                  <div className="col s2"> Order ID: {id} <br /> Item Number: {orderline.id - itemNum} <br /> Date: {createdAt}
                  </div>
                  <div className="col s2">
                    Shipping status: <br /> {orderStatus(shipped)}
                  </div>
                  <div className="col s2"> Order management <br /> Units: {orderline.qty} <br /> Cost Per Unit: {orderline.totalPrice / orderline.qty} <br /> Total cost: {orderline.totalPrice} <br />
                    <div>
                      <Link to={`/orders/${id}`}>
                        <Button waves="light">
                          Edit Order
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
          )
        })}
    </div>
  )

}
/**
 * CONTAINER
 */
// const mapStateToProps = state => {   return {     products: state.products,
//   reviews: state.reviews   }; }; const mapDispatchToProps = dispatch => {
// return {     loadProducts() {       dispatch(fetchProducts());     },   }; };

export default connect(null, null)(OrderItem)

/**
 * PROP TYPES
 */
// Navbar.propTypes = {   handleClick: PropTypes.func.isRequired,   isLoggedIn:
// PropTypes.bool.isRequired }