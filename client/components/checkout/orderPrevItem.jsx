import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ProductCardView } from '../index.js';
import {fetchProducts} from '../../store/index.js'
// need to add prop components into ProductCardView

import { Table, Input } from 'react-materialize';

export class OrderPrevItem extends Component {

  componentDidMount() {
    // this.props.loadProducts();
  }



  render() {

    console.log(this.props)
    const { currentItem } = this.props;
    return (
      <tr>
      <td><img width="125" src={currentItem.image} /></td>
            <td>{currentItem.title}</td>

            <td>{currentItem.qty}</td>
            <td>$ {currentItem.currentPrice}</td>
              {(currentItem.currentPrice) ? (
            <td>$ {Number(Math.round(currentItem.currentPrice * currentItem.qty * 100) / 100).toFixed(2)}</td>
            ) :
             null
            }

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
)(OrderPrevItem);
