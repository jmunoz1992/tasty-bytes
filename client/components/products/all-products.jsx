import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ProductCardView } from './product-card.jsx';
import {fetchProducts, fetchCartProducts, addOrUpdateCart} from '../../store';
import { withRouter } from 'react-router-dom'

export class AllProductsHome extends Component {
  componentDidMount() {
    this.props.loadProducts();
    this.props.loadCart();
  }

  render() {
    const {products, updateCart} = this.props;
    return (
      <div className="center-align" id="all-products">
        <h1>ALL PRODUCTS</h1>
        <div className="center-align">
          <div className="row">
            {products && products.map(product => {
              return (<ProductCardView key={product.id} product={product} updateCart={updateCart} />);
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadProducts() {
      dispatch(fetchProducts());
    },
    loadCart() {
      dispatch(fetchCartProducts());
    },
    updateCart(id, qty) {
      dispatch(addOrUpdateCart(id, qty));
    },
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AllProductsHome));
