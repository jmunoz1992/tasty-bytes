import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchCartProducts} from '../../store/index.js'
import { ProductCardView } from '../index.js';
import { addShippingInfo } from '../../store/index.js'


// need to add prop components into ProductCardView

// import { CartItem } from './cartItem.jsx';
import { Table, Button } from 'react-materialize';

export class Checkout extends Component {

  constructor(props){
    super(props);

    this.state = {
      name: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      email: ''
    }

    this.textChangeHandler = this.textChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {


  }

  textChangeHandler(evt){
    if (evt.target.id === 'name'){
      this.setState({name: evt.target.value});
    }
    else if (evt.target.id === 'address'){
      this.setState({address: evt.target.value});
    }
    else if (evt.target.id === 'address_line_2'){
      this.setState({address2: evt.target.value});
    }
    else if (evt.target.id === 'city'){
      this.setState({city: evt.target.value});
    }
    else if (evt.target.id === 'state'){
      this.setState({state: evt.target.value});
    }
    else if (evt.target.id === 'zip_code'){
      this.setState({zip: evt.target.value});
    }
    else if (evt.target.id === 'email'){
      this.setState({email: evt.target.value});
    }
  }

  submitHandler(evt){
    evt.preventDefault();
    this.props.addShippingInfo(this.state)
    this.props.history.push('/orderPreview')
  }

  render() {
    let user = this.props.user;

    return (
      <div className="row">
      <form className="col s12" onSubmit={this.submitHandler} >
        <div className="row">
          <div className="input-field col s6">
            <input
            id="name"
            type="text"
            defaultValue={ (user && user.name) ? user.name : ''}
            className="validate"
            autoComplete="name"
            onChange={this.textChangeHandler} />
            <label htmlFor="name">Full Name</label>

          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="address" type="text" className="validate" autoComplete="address" onChange={this.textChangeHandler} />
            <label htmlFor="Address">Address</label>
          </div>
        </div>
        <div className="row">
        <div className="input-field col s12">
          <input id="address_line_2" type="text" className="validate" autoComplete="address_line_2" onChange={this.textChangeHandler} />
          <label htmlFor="Address_line_2">Address Line 2 (optional)</label>
        </div>
      </div>
      <div className="row">
          <div className="input-field col s4">
            <input id="city" type="text" className="validate" autoComplete="city" onChange={this.textChangeHandler} />
            <label htmlFor="city">City</label>
          </div>
          <div className="input-field col s4">
            <input id="state" type="text" className="validate"
            autoComplete="state" onChange={this.textChangeHandler} />
            <label htmlFor="state">State</label>
          </div>
          <div className="input-field col s4">
          <input id="zip_code" type="text" className="validate" autoComplete="zip_code" onChange={this.textChangeHandler} />
          <label htmlFor="zip_code">Zip Code</label>
        </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
            id="email"
            type="email"
            className="validate"
            defaultValue={ user ? user.email : ''}
            autoComplete="email"
            onChange={this.textChangeHandler} />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="row center-align">
        <Button onClick={this.submitHandler} waves='light'>Preview my Order</Button>
        </div>
      </form>
    </div>
    )
}

}

const mapStateToProps = state => {
  return {
    cartItems: state.cartItems,
    cartPrices: state.cartPrices,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // loadShippingInfo() {
    //   dispatch(getShippingInfo());
    // },
    addShippingInfo(shippingInfo) {
      dispatch(addShippingInfo(shippingInfo));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
