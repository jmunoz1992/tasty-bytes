import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProductCardView } from './product-card.jsx';
import { fetchProducts, fetchCartProducts, addToCart, deleteProduct, fetchCategories } from '../../store';
import { withRouter, Link } from 'react-router-dom'
import { Dropdown, Button } from 'react-materialize';


export class AllProductsHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
  }

  componentWillMount() {
    this.props.loadProducts();
    this.props.loadCart();
    this.props.loadCategories();
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      search: value
    })
  }

  filterProducts = (products) => {
    let search = this.state.search
    var regex = new RegExp(search, 'gi');
    return products.filter(product => {
      return product.title.match(regex)
    })
  }

  render() {
    const { products, updateCart, user, removeProduct } = this.props;
    let isAdmin = false;
    if (user) {
      isAdmin = user.isAdmin
    }
    let categories = this.props.categories;
    categories.sort(function compare(a, b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    });

    let filtered = this.filterProducts(products);
    return (
      <div id="all-products" className="row center-align">
        <div className="inputGroup center-align" style={{ 'alignItems': 'flex-start' }}>
          <Dropdown
            trigger={
              <Button style={{ 'backgroundColor': '#000000', 'color': '#ffffff', 'height': '50px', 'width': '200px', 'borderRadius': '0px' }}>CATEGORIES</Button>
            }
            options={{ belowOrigin: true, hover: true }}
          >
            <div>
              <Link
                to={`/`}
                style={{ color: '#cfb56a' }}
              >ALL
              </Link>
              <br />
            </div>
            {
              categories && categories.map(category => {
                return (
                  <div key={category.id}>
                    <Link
                      to={`/categories/${category.id}`}
                      style={{ color: '#cfb56a' }}
                    >{category.name}
                    </Link>
                    <br />
                  </div>
                );
              })}
          </Dropdown>
          <input
            required
            onChange={(evt) => this.handleChange(evt, 'title')}
            name="title"
            style={{ 'width': '1500', 'textAlign': 'center', 'marginLeft': '20px', 'padding': '0px', 'fontSize': '25px', 'border': 'solid 4px black', 'borderRadius': '20px' }}
            placeholder="SEARCH PRODUCTS"
            value={this.state.search} />
        </div>
        <div className="center-align">
          <h3 style={{ 'fontFamily': 'Georgia, serif' }}>ALL PRODUCTS</h3>
          {
            isAdmin ?
              <div>
                <Link to="/admin/products/add" className="add-button" ><button>Add New Product</button></Link>
              </div>
              :
              null
          }
          <div className="row center-align">
            {filtered && filtered.map(product => {
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
    categories: state.categories,
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
      dispatch(addToCart(id, qty));
    },
    loadCategories() {
      dispatch(fetchCategories());
    },
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AllProductsHome));
