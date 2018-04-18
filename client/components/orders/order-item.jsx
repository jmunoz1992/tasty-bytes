import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
// import {logout} from '../store'

const OrderItem = (props) => {
//const OrderItem = ({ handleClick, isLoggedIn }) => {
    console.log('The props are: ', props);
    
    return (

    <div className="row">
        <div className="col s1"> Order ID: <br /> Date: </div>
        <div className="col s2"> Insert Product Image </div>
        <div className="col s4"> Insert product title and description</div>
        <div className="col s2"> Insert the shipping status </div>
        <div className="col s3"> Order management screen </div>
    </div>


    //   <div>
    //     <h1>Tasty Bytes</h1>
    //     <nav>
    //       {isLoggedIn ? (
    //         <div>
    //           {/* The navbar will show these links after you log in */}
    //           <Link to="/home">Home</Link>
    //           <a href="#" onClick={handleClick}>
    //             Logout
    //           </a>
    //         </div>
    //       ) : (
    //         <div>
    //           {/* The navbar will show these links before you log in */}
    //           <Link to="/login">Login</Link>
    //           <Link to="/signup">Sign Up</Link>
    //         </div>
    //       )}
    //     </nav>
    //     <hr />
    //   </div>
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
