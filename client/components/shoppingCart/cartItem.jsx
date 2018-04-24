import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ProductCardView } from '../index.js';
// import { addOrUpdateCart } from '../../store/index.js'
// need to add prop components into ProductCardView
import { Link } from 'react-router-dom'
import { cartItem } from './cartItem.jsx';
import { Table, Input } from 'react-materialize';

export class CartItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      qty: 0,
      dirty: false
    }
    this.handleQty = this.handleQty.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    // this.props.loadProducts();
  }

  onChange(evt){
    this.setState({qty: evt.target.value, dirty: true})
  }

  handleQty(evt){
    evt.preventDefault();
    this.props.updateCart(this.props.currentItem.id, Number(evt.target.value))
  }

  handleSubmit(evt){
    evt.preventDefault();
    if (this.state.dirty){
    this.props.updateCart(this.props.currentItem.id, Number(this.state.qty))
    }
  }

  render() {

    const { currentItem, deleteClickHandler, handleQtyChange } = this.props;
    return (
      <tr>
      <td><Link to={`/products/${currentItem.id}`}><img width="125" src={currentItem.image} /></Link></td>
      <td><Link to={`/products/${currentItem.id}`}>{currentItem.title}</Link></td>

            <td>
            <form onSubmit={this.handleSubmit}>

              <input id="order-qty" type="number" name={currentItem.id.toString()} defaultValue={currentItem.qty} onBlur={this.handleQty} onChange={this.onChange} />

          </form>


            </td>
            <td>$ {currentItem.currentPrice}</td>
              {(currentItem.currentPrice) ? (
            <td>$ {Number(Math.round(currentItem.currentPrice * currentItem.qty * 100) / 100).toFixed(2)}</td>
            ) :
             null
            }
            <td>
            <Input name={currentItem.id.toString()} type='checkbox' value='red' label='Delete' onClick={deleteClickHandler} />
            </td>



          </tr>
    );
  }
}

const mapStateToProps = state => {
  return {
    // products: state.products,
    // reviews: state.reviews
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // updateCart(id, qty) {
    //   dispatch(addOrUpdateCart(id, qty));
    // },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItem);
