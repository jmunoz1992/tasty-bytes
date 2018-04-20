import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ProductCardView } from '../index.js';
import {fetchProducts} from '../../store/index.js'
// need to add prop components into ProductCardView

import { cartItem } from './cartItem.jsx';
import { Table, Input } from 'react-materialize';

export class CartItem extends Component {

  componentDidMount() {
    // this.props.loadProducts();
  }



  render() {

    console.log(this.props)
    const { currentItem } = this.props;
    return (
      <tr>
      <td><img width="125" src={currentItem.imgUrl} /></td>
            <td>{currentItem.productName}</td>

            <td>
            <form>

              <input type="text" defaultValue={currentItem.qty} />

          </form>


            </td>
            <td>{currentItem.currentPrice}</td>
            <td>{currentItem.currentPrice * currentItem.qty}</td>
            <td>
            <Input name='group1' type='checkbox' value='red' label='Delete' />
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
    // loadProducts() {
    //   dispatch(fetchProducts());
    // },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItem);
