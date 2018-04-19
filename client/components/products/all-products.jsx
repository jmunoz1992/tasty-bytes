import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ProductCardView } from './product-card.jsx';
import {fetchProducts} from '../../store';
import { withRouter } from 'react-router-dom'

export class AllProductsHome extends Component {
  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    const {products} = this.props;
    return (
      <div className="center-align">
        <h1>ALL PRODUCTS</h1>
        <div className="cent er-align">
          <div className="row">
            {products && products.map(product => {
              return (<ProductCardView key={product.id} product={product} />);
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AllProductsHome));
