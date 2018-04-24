import React, {Component} from 'react'
import {fetchOrders, callOrderUpdate} from '../../store'
import {Button, Dropdown, NavItem} from 'react-materialize'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'


export const AdminSort = (props) => {
    return (
        <div>
        <Dropdown trigger={
          <Button>Order Categories</Button>
        }>
        <div className='admin-sort'>
        <NavLink to={ '/orders/new'} onClick = { () => {props.handleCatSelect('new')}}>New Orders</NavLink>
        
        <NavLink to={ '/orders/processing'} onClick = { () => props.handleCatSelect('processing')}>Processing</NavLink>
        
        <NavLink to={ '/orders/canceled'} onClick = { () => props.handleCatSelect('canceled')}>Canceled</NavLink>
        
        <NavLink to={ '/orders/completed'} onClick = { () => props.handleCatSelect('completed')}>Completed</NavLink>
        
        <NavLink to={ '/orders/all'} onClick = { () => props.handleCatSelect('all')}>All Categories</NavLink>
       </div>
        </Dropdown>
        </div>
      )

    }

const mapState = state => {
  return {orders: state.orders,
          products: state.products
        };
}

const mapDispatch = (dispatch) => {
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
