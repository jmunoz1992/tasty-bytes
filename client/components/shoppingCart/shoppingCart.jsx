import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ProductCardView } from '../product-card.jsx';
import {fetchProducts} from '../../store/index.js'
import {Table} from 'react-materialize';
// need to add prop components into ProductCardView

export class ShoppingCart extends Component {
  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    const {products} = this.props;
    return (
      <div className="center-align">
        <h1>Shopping Cart</h1>
        <div >
        <Table style={{maxWidth: 1000}}>
        <thead>
        <tr>
          <th data-field="pic"></th>
          <th data-field="disc">Name</th>
          <th data-field="qty">QTY</th>
          <th data-field="uPrice">Unit Price</th>
          <th data-field="Total">Total</th>
          <th data-field="Delete"></th>
        </tr>
        </thead>
        <tbody>
          {/*<div className="row">
            {products && products.map(product => {
              return <ProductCardView key={product.id} product={product} />
            })}
          </div>*/}
          </tbody>
          </Table>
        </div>
      </div>
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
    loadProducts() {
      dispatch(fetchProducts());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart);
