import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProductCardView } from './product-card.jsx';
import { fetchProducts, fetchCartProducts, addToCart, deleteProduct, fetchCategories, fetchOrders } from '../../store';
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
    this.props.loadOrders();
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
  handleQtyUpdate = () => {


    console.log('in here')
    console.log(this.props)
    //loop through this.props.orders and get the oerlines.
    let orderlinesOut = []
    this.props.orders.forEach( order => {
      for (var i = 0; i < order.orderlines.length; i++){
        orderlinesOut.push(order.orderlines[i])
      }
    })
    console.log('finished-----------', orderlinesOut);
    let purchasedObj = {};
    orderlinesOut.forEach(orderline => {

      let purchasedQty = orderline.qty;
      let purchasedId = orderline.productId;
      
      if (!purchasedObj[purchasedId]){
        purchasedObj[purchasedId] = purchasedQty;
      }
      else {
        purchasedObj[purchasedId] += purchasedQty;
      }
    })
    
    console.log('the purchase obj is ', purchasedObj)

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
      <div id="all-products">
        <div className="inputGroup" style={{'alignItems': 'flex-start'}}>
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
          <input
            required
            onChange={(evt) => this.handleChange(evt, 'title')}
            name="title"
            style={{'width': '1500', 'textAlign': 'center', 'marginLeft': '20px', 'padding': '0px', 'fontSize': '25px'}}
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
                <div>
                <button type="submit" className="btn btn-block btn-primary" onClick={this.handleQtyUpdate} > Update Quantity</button>
              </div>
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
    orders: state.orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadProducts() {
      dispatch(fetchProducts());
    },
    loadOrders(){
      dispatch(fetchOrders());
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
