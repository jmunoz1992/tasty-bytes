import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProductCardView } from './product-card.jsx';
import { fetchProducts, fetchCartProducts, addOrUpdateCart, deleteProduct, fetchCategories } from '../../store';
import { withRouter, Link } from 'react-router-dom'
import { Dropdown, Button } from 'react-materialize';


export class CategorySelected extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
    }
  }

  componentDidMount() {
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
    if (products && products.length) {
      let search = this.state.search
      var regex = new RegExp( search, 'gi' );
      return products.filter(product => {
        return product.title.match(regex)
      })
    }
  }

  render() {
    const { products, updateCart, user, removeProduct, categories } = this.props;
    let isAdmin = false;
    if (user) {
      isAdmin = user.isAdmin
    }
    let categoryId = +this.props.match.params.id;
    let selectedProducts = categories.filter(category => category.id === categoryId)[0];
    let categoryName = '';
    let filtered = [];
    if (selectedProducts) {
      filtered = this.filterProducts(selectedProducts.products);
      categoryName = selectedProducts.name;
    } else {
      filtered = this.filterProducts(products);
    }
    return (
      <div id="all-products">
        {(categories) ? (
          <Dropdown
            trigger={
              <Button>CATEGORIES</Button>
            }
            options={{ belowOrigin: true, hover: true }}
          >
            {categories && categories.map(category => {
              return (
                <div key={category.id}>
                  <Link
                    to={`/categories/${category.id}`}
                    onClick={() => this.handleClick(category.name)}
                    style={{color: '#26a69a'}}
                  >{category.name}
                  </Link>
                  <br />
                </div>
              );
            })}
          </Dropdown>
        ) :
          null
        }
        <div className="center-align inputGroup">
          <label htmlFor="title"><h5>Search Products: </h5></label>
          <input
            required
            onChange={(evt) => this.handleChange(evt, 'title')}
            name="title"
            value={this.state.search} />
        </div>
        <div className="center-align">
          <h1>{categoryName} products</h1>
          {
            isAdmin ?
              <div>
                <Link to="/admin/products/add" className="add-button" ><button>Add New Product</button></Link>
              </div>
              :
              null
          }
          <div className="row">
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
      dispatch(addOrUpdateCart(id, qty));
    },
    loadCategories() {
      dispatch(fetchCategories());
    },
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorySelected));
