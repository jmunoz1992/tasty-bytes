import React, { Component } from 'react';
import { fetchProducts, addToCart, fetchReviewsByProd } from '../../store';
import { Button, NavItem, Dropdown, Tabs, Tab } from 'react-materialize';
import { EditProduct, AllReviews, FiveStars, NewReview } from '../index';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

export class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 1,
      editFormShow: this.props.edit || false
    }
  }

  componentDidMount() {
    this.props.loadProducts();
    this.props.loadReviews(this.props.match.params.id);
  }

  handleEdit= (evt) => {
    let productId = this.props.match.params.id
    if (!this.state.editFormShow) {
      this.props.history.push(`/products/${productId}/edit`)
    } else {
      this.props.history.push(`/products/${productId}`)
    }
    evt.preventDefault();
    this.setState({
      editFormShow: !this.state.editFormShow
    })
  }

  handleChange = (evt) => {
    let qty = evt.target.value;
    this.setState({
      qty
    })
  }

  render() {
    // console.log(this.props, "props are")
    let { products, user } = this.props;

    const productId = +this.props.match.params.id;
    let productSelected;
    if (products) {
      productSelected = products.filter(product => product.id === productId)[0];
    }
    let isAdmin = false;
    if (user) {
      isAdmin = user.isAdmin;
    }
    return (
      <div className="center-align">
        {productSelected ?
          <div className="row center-align">
            <div className="col s3 m3 center-align" />
            <div className="col s6 m6 center-align">
                <div className="card blue-grey darken-1 center-align">
                  <div className="card-content white-text center-align">
                    <span className="card-title">{productSelected.title}</span>
                    <img src={productSelected.image} alt="Chocolate" height="100" width="100" />
                    <br />
                    <p>FULL DESCRIPTION: {productSelected.fullDescription} </p>
                    <br />
                    <p>CATEGORY: </p>
                    <br />
                    <p>${productSelected.priceActual} </p>
                    {productSelected.avgRating ? <FiveStars numStars={productSelected.avgRating} /> : null}
                    <p>{productSelected.reviews.length} Review(s)</p>
                    <br />
                    <div>
                      {productSelected.inventoryQty ?
                        <p>{productSelected.inventoryQty} currently in stock</p> :
                        <p>NOT IN STOCK</p>
                      }
                    </div>
                    <label>QTY</label>
                    <input id="order-qty"
                    onChange={this.handleChange}
                    type="number"
                    name="qty"
                    step="1"
                    min="0"
                    max={productSelected.inventoryQty}
                    defaultValue={this.state.qty} />
                    <br/>
                  <Button
                    onClick={() => { this.props.updateCart(productSelected.id, this.state.qty) }}
                  >ADD TO CART
                    </Button>
                  <br />
                  {
                    isAdmin ?
                      <Button onClick={this.handleEdit} >Edit Product</Button>
                      :
                      <div />
                    }
                    <br />
                    </div>
                    </div>
                    </div>
                            {
                              (isAdmin && this.state.editFormShow) ?
                              <EditProduct product={productSelected} handleEdit={this.handleEdit} />
                              :
                              <div />
                            }
              <Tabs className='tab-demo z-depth-1'>
                  <Tab title="READ REVIEWS">
                  <AllReviews product= {productSelected} />
                  </Tab>
                  <Tab title="WRITE A REVIEW">
                  <NewReview product= {productSelected} />
                  </Tab>
              </Tabs>

            </div>
          : null}
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
    updateCart(id, qty) {
      dispatch(addToCart(id, qty));
    },
    loadReviews(prodId) {
      dispatch(fetchReviewsByProd(prodId));
    },
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct));
