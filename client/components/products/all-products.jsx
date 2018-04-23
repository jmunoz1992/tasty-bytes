import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProductCardView } from './product-card.jsx';
import { fetchProducts, fetchCartProducts, addOrUpdateCart, deleteProduct } from '../../store';
import { withRouter, Link } from 'react-router-dom'

export class AllProductsHome extends Component {
  componentDidMount() {
    this.props.loadProducts();
    this.props.loadCart();
  }

  componentWillMount() {
    this.props.loadProducts();
    this.props.loadCart();
  }

  render() {
    const { products, updateCart, user, removeProduct } = this.props;
    let isAdmin = false;
    if (user) {
      isAdmin = user.isAdmin
    }
    console.log('these are the products ', products);
    return (
      <div className="center-align" id="all-products">
        <h1>ALL PRODUCTS</h1>
        <div className="center-align">
        {
          isAdmin ?
          <div>
            <Link to="/admin/products/add" className="add-button" ><button>Add New Product</button></Link>
          </div>
          :
          null
        }
          <div className="row">
            {products && products.map(product => {
              return (
                <ProductCardView
                  key={product.id}
                  product={product}
                  removeProduct={removeProduct}
                  updateCart={updateCart}
                  user={user} />
              );
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
    reviews: state.reviews,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadProducts() {
      dispatch(fetchProducts());
    },
    removeProduct(prodId) {
      dispatch(deleteProduct(prodId));
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
