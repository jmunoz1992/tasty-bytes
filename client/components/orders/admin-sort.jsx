import React, {Component} from 'react'
import {fetchOrders, callOrderUpdate} from '../../store'
import {Button, Dropdown, NavItem} from 'react-materialize'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

export const AdminSort = (props) => {
    return (
        <div>
        <Dropdown trigger={
          <Button>Order Categories</Button>
        }>
        <NavItem onClick = { () => props.handleCatSelect(1, props.orders)}>New Orders</NavItem>
        <NavItem divider />
        <NavItem onClick = { () => props.handleCatSelect(2, props.orders)}>Processing</NavItem>
        <NavItem divider />
        <NavItem onClick = { () => props.handleCatSelect(3, props.orders)}>Canceled</NavItem>
        <NavItem divider />
        <NavItem onClick = { () => props.handleCatSelect(4, props.orders)}>Completed</NavItem>
        <NavItem divider />
        <NavItem onClick = { () => props.handleCatSelect(5, props.orders)}>All Categories</NavItem>
      </Dropdown>
        </div>
      )

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

export default connect(mapState, mapDispatch)(AdminSort);
