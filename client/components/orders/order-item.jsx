import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { ProductCardView } from '../product-card.jsx';
// import {Link} from 'react-router-dom'
// import {logout} from '../store'

const OrderItem = (props) => {
//const OrderItem = ({ handleClick, isLoggedIn }) => {
    console.log('The props are: here', props);
    //need to add photo eager loading!
    const {id, createdAt, shipped, arrived} = props.content
    console.log(id, createdAt, shipped, arrived);

    const orderStatus = date => {
      if(date === null) {
        return "Incomplete"
      }
      if(date > new Date()){
        return "Incomplete"
      }
      if(date < new Date()){
        return "Complete"
      }
    }

    // export const ProductCardView = (props) => {
    //   const {title, shortDescription, priceActual, image} = props.product;
    
    const cardInfo = {
        title: "test title",
        shortDescription: "test descirptioooooooooooo",
        image: 'no image',
    }
    
    let itemNum = props.content.orderlines[0].id-1;
    console.log(itemNum, "this is item num");
    
    return (
      <div>
      {props.content.orderlines.map( orderline => {
 return (            <div className="row" key={id + "-" + orderline.id}>
                <div className="col s1"> Order ID: {id} <br /> Item Number: {orderline.id-itemNum} <br /> Date: {createdAt} </div>
                <div className="col s6"> <ProductCardView product={cardInfo} /> </div>
                <div className="col s2"> Shipping status {orderStatus(shipped)} </div>
                <div className="col s3"> Order management screen <br /> Units: {orderline.qty}  <br /> Cost Per Unit: {orderline.totalPrice/orderline.qty}  <br /> Total cost: {orderline.totalPrice} </div>
            </div>)}
            )}    
        </div>
    )

}
/**
 * CONTAINER
 */
// const mapStateToProps = state => {
//   return {
//     products: state.products,
//     reviews: state.reviews
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     loadProducts() {
//       dispatch(fetchProducts());
//     },
//   };
// };

export default connect(null, null)(OrderItem)

/**
 * PROP TYPES
 */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
