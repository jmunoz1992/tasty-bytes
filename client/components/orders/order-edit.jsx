import React, { Component } from 'react'
import { fetchOrders, callOrderUpdate } from '../../store'
import { Button, Dropdown, NavItem } from 'react-materialize'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

export class OrderEdit extends Component {
  constructor(props) {
    super(props)
    // this.handleClickShipped = this
    //   .handleClickShipped
    //   .bind(this)
    this.handleClickProcess = this
      .handleClickProcess
      .bind(this)
    this.handleClickCancel = this
      .handleClickCancel
      .bind(this)
  }

  handleClickProcess(message) {
    const id = this
      .props
      .content
      .id;
    if (message === 'Begin Processing!'){
      this
        .props
        .orderUpdate(id, {startProcessing: new Date()})
    }
    else if (message === 'Begin Shipping!'){
      this
        .props
        .orderUpdate(id, {shipped: new Date()})
    }

  }

  handleClickCancel() {
    const id = this.props.content.id

    this
      .props
      .orderUpdate(id, {cancel: new Date()})

  }
  render() {
    let orderMessage;

    if (this.props.content.startProcessing === null && this.props.content.cancel === null){
      orderMessage = 'Begin Processing!';
    }
    else if (this.props.content.startProcessing !== null && this.props.content.shipped === null) {
      orderMessage = 'Begin Shipping!';
    }
    else {
      orderMessage = 'canceled';
    }
 
    return (
      <div>
        <Dropdown trigger={<Button> Edit me ! </Button> } >
            {orderMessage === 'canceled'
            ? <div />
            :
            <NavItem onClick={ () => {this.handleClickProcess(orderMessage)}}> {orderMessage} </NavItem>
          }
            <NavItem onClick={this.handleClickCancel}>Cancel</NavItem>
        </Dropdown>
      </div>
    )

  }
}

const mapState = state => {
  return {orders: state.orders, products: state.products};
}

const mapDispatch = (dispatch, ownProps) => {
  return {

    orderUpdate: (id, updates) => {
      dispatch(callOrderUpdate(id, updates, ownProps.history))
    }
  };
}

export default withRouter(connect(mapState, mapDispatch)(OrderEdit));
