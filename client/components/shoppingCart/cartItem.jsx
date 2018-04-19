import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ProductCardView } from '../products/product-card.jsx';
import {fetchProducts} from '../../store/index.js'
// need to add prop components into ProductCardView

import { cartItem } from './cartItem.jsx';
import { Table, Input } from 'react-materialize';

export class CartItem extends Component {
  componentDidMount() {
    // this.props.loadProducts();
  }

  render() {
    // const {products} = this.props;
    return (
      <tr>
      <td><img width='125' src= "https://www.godivachocolates.eu/images/gene/prod/zoom/goch000340_01_godiva-gold-collection-gift-box-34pc.jpg" /></td>
            <td>chocolate strawberries</td>

            <td>
            <form>

              <input type="text" defaultValue={1}/>

          </form>


            </td>
            <td>$3.76</td>
            <td>$3.76</td>
            <td>
            <Input name='group1' type='checkbox' value='red' label='Delete' />
            </td>



          </tr>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    reviews: state.reviews
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
