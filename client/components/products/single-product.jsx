import React, {Component} from 'react';
import {fetchProducts, addOrUpdateCart} from '../../store';
import { Button, NavItem, Dropdown, Tabs, Tab } from 'react-materialize';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

export class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 1
    }
  }

  componentDidMount () {
    this.props.loadProducts();
  }

  handleChange = (evt) => {
    let qty = evt.target.value;
    this.setState({
      qty
    })
  }

  render() {

    let products = this.props.products;
    const productId = +this.props.match.params.id;
    let productSelected;
    if (products){
      productSelected = products.filter(product => product.id === productId)[0];
    }
    console.log('product props: ', this.props)
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
                    <p>NUM STARS</p>
                    <p>NUM REVIEWS</p>
                    <br />
                    <div>
                      {productSelected.inventoryQty ?
                        <p>{productSelected.inventoryQty} currently in stock</p> :
                        <p>NOT IN STOCK</p>
                      }
                    </div>
                    <label>QTY</label>
                    <input
                    onChange={this.handleChange}
                    type="number"
                    name= "qty"
                    step="1"
                    min="0"
                    max={productSelected.inventoryQty}
                    defaultValue= {this.state.qty} />
                    <Button
                    onClick= {() => {this.props.updateCart(productSelected.id, this.state.qty)}}
                    >ADD TO CART
                    </Button>
                    <br />
                  </div>
                </div>
              </div>
              <Tabs className='tab-demo z-depth-1'>
                  <Tab title="READ REVIEWS">INSERT SOME COOL REVIEWS HERE</Tab>
                  <Tab title="WRITE A REVIEW">POP UP REVIEW FORM FOR LOGGED IN USERS</Tab>
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
    reviews: state.reviews
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadProducts() {
      dispatch(fetchProducts());
    },
    updateCart(id, qty) {
      dispatch(addOrUpdateCart(id, qty));
    },
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct));
