import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProductCardView } from './product-card.jsx';
import { fetchProducts, fetchCartProducts, addOrUpdateCart, deleteProduct, fetchCategories } from '../../store';
import { withRouter, Link } from 'react-router-dom'
import { Dropdown, Button } from 'react-materialize';


export class AllProductsHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: ''
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
    let search = this.state.search
    var regex = new RegExp( search, 'gi' );
    return products.filter(product => {
      return product.title.match(regex)
    })
  }

  render() {
    const { products, updateCart, user, removeProduct, categories } = this.props;
    let isAdmin = false;
    if (user) {
      isAdmin = user.isAdmin
    }
    let filtered = this.filterProducts(products);
    return (
      <div id="center-align all-products">
        <div className="inputGroup" style={{'alignItems': 'flex-start'}}>
          {(categories) ? (
            <Dropdown
              trigger={
                <Button style={{'backgroundColor': '#000000', 'color': '#ffffff'}}>CATEGORIES</Button>
              }
              options={{ belowOrigin: true, hover: true }}
            >
              {categories && categories.map(category => {
                return (
                  <div key={category.id}>
                    <Link
                      to={`/categories/${category.id}`}
                      style={{color: '#cfb56a'}}
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
          <input
            required
            onChange={(evt) => this.handleChange(evt, 'title')}
            name="title"
            style={{'width': '1000', 'textAlign': 'center', 'marginLeft': '20px', 'padding': '0px', 'fontSize': '25px'}}
            placeholder="SEARCH PRODUCTS"
            value={this.state.search} />
            <i className="material-icons"
              style={{'fontSize': '3rem'}}>search</i>
        </div>
        <div className="center-align">
          <h1 style={{'fontFamily': 'Georgia, serif'}}>ALL PRODUCTS</h1>
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
)(AllProductsHome));
