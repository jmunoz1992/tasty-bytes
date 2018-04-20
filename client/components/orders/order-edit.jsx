import React, {Component} from 'react'
import {fetchOrders, orderShipped} from '../../store'
import {Button, Dropdown, NavItem} from 'react-materialize'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// import {Link} from 'react-router-dom';

// import {Link} from 'react-router-dom' import {logout} from '../store'
//WE NEED TO DO SOME THUNKS! LET'S DELETE ORDER AND MARK SHIPPED. MARK SHIPPED FIRST

export class OrderEdit extends Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  // componentDidMount(){
  //   this.props.getOrders() ;
  // }


// console.log("edit props are: ", props) 
// const runThis = props.shipped;
// console.log('this is type of ', typeof runThis);

  handleClick () {
    console.log('props are: ', this)
    // const id = this.props.content.content.id;
    // this.props.markShipped(id)

  }

    render(){

      console.log('props are (render): ', this.props)

    const orders = this.props.orders ? this.props.orders : [];
    // console.log('order edit props are: ', this.props)
    return (
      <div>
      <Dropdown trigger={
          <Button>Edit me!</Button>
        }>
        <NavItem onClick={this.handleClick}>Delete</NavItem>
        <NavItem onClick={this.handleClick}>Mark Shipped</NavItem>
      </Dropdown>

      </div>
    )

  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {orders: state.orders,
          products: state.products
        };
}

const mapDispatch = dispatch => {
  return {
    getOrders: () => {
      dispatch(fetchOrders())
    },
    markShipped: () => {
      dispatch(orderShipped())
    }
  };
}

// const mapDispatch = (dispatch) => {
//   const boundActionCreators = bindActionCreators(getOrders(), dispatch);
//   const allActionProps = {...boundActionCreators, dispatch}
//   return allActionProps;
// }

export default connect(mapState, mapDispatch)(OrderEdit);


/**
 * PROP TYPES
 */
// Navbar.propTypes = {   handleClick: PropTypes.func.isRequired,   isLoggedIn:
// PropTypes.bool.isRequired }