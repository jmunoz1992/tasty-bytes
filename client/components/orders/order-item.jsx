import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
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




    return (
        <div>
            {props.content.orderlines.map( orderline =>
(            <div className="row" key={id + "-" + orderline.id}>
                <div className="col s1"> Order ID: {id} <br /> Order ID: {orderline.id} <br /> Date: {createdAt} </div>
                <div className="col s2"> <img src={"http://fillmurray.com/200/200"} /> </div>
                <div className="col s4"> Insert product title and description.  <br />  Units: {orderline.qty}  <br /> Cost Per Unit: {orderline.totalPrice/orderline.qty}  <br /> Total cost: {orderline.totalPrice}
                </div>
                <div className="col s2"> Shipping status {orderStatus(shipped)} </div>
                <div className="col s3"> Order management screen </div>
            </div>)
            )}    
        </div>
    )

}
/**
 * CONTAINER
 */
// const mapState = state => {
//   return null;
// }

// const mapDispatch = dispatch => {
//   return null;
// }

export default connect(null, null)(OrderItem)

/**
 * PROP TYPES
 */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
