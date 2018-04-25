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
      email: '',
      dirty: false,
      error: [],
    }

    this.textChangeHandler = this.textChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.validation = this.validation.bind(this);
    this.submit = this.submit.bind(this);
  }

  // componentDidMount() {
  //   if (this.props.shippingInfo.email){
  //   }
  // }

  validation(){
    let error = []
      if (this.state.dirty === true) {
    if (this.state.name.length === 0){
      error.push('name')
    }
    if (this.state.address.length === 0){
      error.push('address')
    }
    if (this.state.city.length === 0){
      error.push('city')
    }
    if (this.state.state.length === 0){
      error.push('state')
    }
    if (this.state.zip.length === 0){
      error.push('zip')
    }
    if (this.state.email.length === 0){
      error.push('email')
    }
    }
    else {
      error = ['name', 'address', 'city', 'state', 'zip', 'email']
    }
    this.setState({error: error}, this.submit);
  }

  textChangeHandler(evt){

    if (evt.target.id === 'name'){
      this.setState({name: evt.target.value});
    }
    if (evt.target.id === 'address'){
      this.setState({address: evt.target.value});
    }
    if (evt.target.id === 'address_line_2'){
      this.setState({address2: evt.target.value});
    }
    if (evt.target.id === 'city'){
      this.setState({city: evt.target.value});
    }
    if (evt.target.id === 'state'){
      this.setState({state: evt.target.value});
    }
    if (evt.target.id === 'zip_code'){
      this.setState({zip: evt.target.value});
    }
    if (evt.target.id === 'email'){
      this.setState({email: evt.target.value});
    }
    this.setState({dirty: true})
  }

  submit(){
  if (this.state.dirty === true && !this.state.error.length){
      this.props.addShippingInfo(this.state)
      this.props.history.push('/orderPreview')
    }
  }

  submitHandler(evt){
    evt.preventDefault();
    this.validation();

  }

  render() {

    let user = this.props.user;

    return (
      <div className="row container">
      <form className="col s12" onSubmit={this.submitHandler} >
        <div className="row">
          <div className="input-field col s6">
            <input
            id="name"
            type="text"
            defaultValue={ (user && user.name) ? user.name : ''}
            className="validate"
            autoComplete="name"
            onChange={this.textChangeHandler}
             />
             {this.state.error.indexOf('name') !== -1 ? <label htmlFor="name" style={{color: 'red'}}>Full Name</label> : <label htmlFor="name">Full Name</label>}

          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="address" type="text" className="validate active"
             autoComplete="address" onChange={this.textChangeHandler} />
            {this.state.error.indexOf('address') !== -1 ? <label htmlFor="address" style={{color: 'red'}}>Address</label> : <label htmlFor="address">Address</label>}
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
            {this.state.error.indexOf('city') !== -1 ? <label htmlFor="city" style={{color: 'red'}}>City</label> : <label htmlFor="city">City</label>}
          </div>
          <div className="input-field col s4">
            <input id="state" type="text" className="validate"
            autoComplete="state" onChange={this.textChangeHandler} />
            {this.state.error.indexOf('state') !== -1 ? <label htmlFor="state" style={{color: 'red'}}>State</label> : <label htmlFor="state">State</label>}
          </div>
          <div className="input-field col s4">
          <input id="zip_code" type="number" className="validate" autoComplete="zip_code" onChange={this.textChangeHandler} />
          {this.state.error.indexOf('zip') !== -1 ? <label htmlFor="zip_code" style={{color: 'red'}}>Zip Code</label> : <label htmlFor="zip_code">Zip Code</label>}
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
            {this.state.error.indexOf('email') !== -1 ? <label htmlFor="email" style={{color: 'red'}}>Email</label> : <label htmlFor="email">Email</label>}
          </div>
        </div>
        {this.state.error.length > 0 ? <div className="row center-align"> <p style={{color:'red'}}> Please fill in all the required fields </p></div> : null}
        <div className="row center-align">
        <Button
        onClick={this.submitHandler}
        waves='light'
        style={{'backgroundColor': '#000000', 'color': '#ffffff', 'borderRadius': '10px'}}
        >Preview my Order</Button>
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
    shippingInfo: state.shippingInfo,
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
