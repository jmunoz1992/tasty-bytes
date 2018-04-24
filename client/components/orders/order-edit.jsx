import React, { Component } from 'react'
import { fetchOrders, callOrderUpdate } from '../../store'
import { Button, Dropdown, NavItem } from 'react-materialize'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

export class OrderEdit extends Component {
  constructor(props) {
    super(props)
<<<<<<< HEAD
    this.handleClickShipped = this.handleClickShipped.bind(this)
    this.handleClickProcess = this.handleClickProcess.bind(this)
    this.handleClickCancel = this.handleClickCancel.bind(this)
    
    this.state = {
        id: props.content.id,
        shipped: props.content.shipped,
        startProcessing: props.content.startProcessing,
        cancel: props.content.cancel
    }
  }

  handleClickShipped () {
    const id = this.props.content.id
      this.setState({
        shipped: new Date()}, () => {
          this.props.orderUpate(id, this.state)

      })
  }

  handleClickProcess () {
    const id = this.props.content.id
    this.setState({
      startProcessing: new Date()}, () => {
        this.props.orderUpate(id, this.state)
      }
  )
=======
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
>>>>>>> 4bf570eefc529d3fd15580c1e4f46b72d0caa326

  }

  handleClickCancel() {
    const id = this.props.content.id
<<<<<<< HEAD
    this.setState({
      cancel: new Date()}, () => {
        this.props.orderUpate(id, this.state)
    })
=======

    this
      .props
      .orderUpdate(id, {cancel: new Date()})
>>>>>>> 4bf570eefc529d3fd15580c1e4f46b72d0caa326

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
 
    console.log(orderMessage, 'order messgae')
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
<<<<<<< HEAD
  console.log('ownprops are : ', ownProps)
  return {
    getOrders: () => {
      dispatch(fetchOrders())
    },
    orderUpate: (id, updates) => {
=======
  // console.log('ownprops are : ', ownProps)
  return {
    // getOrders: () => {
    //   dispatch(fetchOrders())
    // },
    orderUpdate: (id, updates) => {
>>>>>>> 4bf570eefc529d3fd15580c1e4f46b72d0caa326
      dispatch(callOrderUpdate(id, updates, ownProps.history))
    }
  };
}

export default withRouter(connect(mapState, mapDispatch)(OrderEdit));
