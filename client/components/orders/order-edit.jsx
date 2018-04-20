import React, {Component} from 'react'
import {fetchOrders, orderShipped} from '../../store'
import {Button, Dropdown, NavItem} from 'react-materialize'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


export class OrderEdit extends Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const id = this.props.content.id
    const updates = {
      id: id,
      shipped: new Date()
    }

    this.props.markShipped(id, updates)
  }

    render(){

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
    markShipped: (id, updates) => {
      dispatch(orderShipped(id, updates))
    }
  };
}

export default connect(mapState, mapDispatch)(OrderEdit);
