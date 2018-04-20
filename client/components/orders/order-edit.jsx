import React, {Component} from 'react'
import {fetchOrders, callOrderUpdate} from '../../store'
import {Button, Dropdown, NavItem} from 'react-materialize'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


export class OrderEdit extends Component {
  constructor(props){
    super(props)
    this.handleClickShipped = this.handleClickShipped.bind(this)
    this.handleClickProcess = this.handleClickProcess.bind(this)
    this.handleClickCancel = this.handleClickCancel.bind(this)
  }

  handleClickShipped () {
    const id = this.props.content.id
    const updates = {
      id: id,
      shipped: new Date()
    }
    this.props.orderUpate(id, updates)
  }

  handleClickProcess () {
    const id = this.props.content.id
    const updates = {
      id: id,
      startProcessing: new Date()
    }
    this.props.orderUpate(id, updates)
  }

  handleClickCancel () {
    const id = this.props.content.id
    const updates = {
      id: id,
      cancel: new Date(),
    }
    this.props.orderUpate(id, updates)
  }
    render(){


    return (
      <div>
      <Dropdown trigger={
          <Button>Edit me!</Button>
        }>
        {this.props.content.startProcessing === null && this.props.content.cancel === null ?
        <NavItem onClick={this.handleClickProcess}>Begin Processing</NavItem>
        : ( this.props.content.shipped || this.props.content.cancel ? <div /> : 
          <NavItem onClick={this.handleClickShipped}>Mark Shipped</NavItem>
        )
      }
      <NavItem onClick={this.handleClickCancel}>Cancel</NavItem>
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
    orderUpate: (id, updates) => {
      dispatch(callOrderUpdate(id, updates))
    }
  };
}

export default connect(mapState, mapDispatch)(OrderEdit);
