import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, addProduct, newErrorMessage } from '../../store';
import { ErrorMessage } from '../index';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button } from 'react-materialize';

export class AddProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {
        title: '',
        shortDescription: '',
        fullDescription: '',
        inventoryQty: 0,
        image: '',
        pdtWt: 0,
        priceActual: 0
      },
      errors: [],
      dirty: false
    }
  }

  componentDidMount() {
    this.props.loadProducts();
  }

  handleChange = (event, field) => {
    let productInfo = Object.assign({}, this.state.product)
    const value = event.target.value;
    productInfo[field] = value;

    this.setState({
      dirty: true,
      product: productInfo
    }, this.validate)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let product = this.state.product
    this.props.createProduct(product)
  }

  validate = () => {
    let errors = [];
    let product = this.state.product
    if (this.state.dirty) {
      if (+product.inventoryQty < 0) errors.push('Inventory Qty cannot be less than zero');
      if (+product.pdtWt <= 0) errors.push('Product Weight must be greater than zero');
      if (+product.priceActual <= 0) errors.push('Product Price must be greater than zero');
      if (!product.title.length) errors.push('Product Name is required');
      if (!product.shortDescription.length) errors.push('Short Description is required');
      if (!product.fullDescription.length) errors.push('Full Description is required');
    }
    this.setState({
      errors: errors
    })
  }

  render() {
    const { products, user } = this.props;
    const product = this.state.product;
    let isAdmin = false;
    if (user) {
      isAdmin = user.isAdmin
    }
    let disableSubmit = ((this.state.errors && this.state.errors.length) || !this.state.dirty) ? true : false;
    return (
      <div className="center-align">
        {
          isAdmin ?
            <div>
              <h2>Add New Product</h2>
              {
                this.props.errorMessage.length ?
                <ErrorMessage
                errorMessage={this.props.errorMessage}
                clearError={this.props.clearError}
                />
                :
                <div />
              }
              <div className="errorMessage">
            {
              this.state.errors.length ?
              <h5>{this.state.errors.join(`, `)}</h5>
              :
              <div />
            }
            </div>
              <form className="addProd" onSubmit={(event) => { this.handleSubmit(event) }} >
                <Button
                onClick={this.handleSubmit}
                disabled={disableSubmit}
                >Add Product
                </Button>
                <section>
                  <div className="inputGroup">
                    <label htmlFor="title"><h5>Product Name: </h5></label>
                    <input
                      required
                      onChange={(evt) => this.handleChange(evt, 'title')}
                      name="title"
                      value={product.title} />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="shortDesc"><h5>Product Short Description: </h5></label>
                    <textarea
                      onChange={(evt) => this.handleChange(evt, 'shortDescription')}
                      name="shortDescription"
                      value={product.shortDescription} />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="fullDesc"><h5>Product Full Description: </h5></label>
                    <textarea
                      onChange={(evt) => this.handleChange(evt, 'fullDescription')}
                      name="fullDescription"
                      value={product.fullDescription} />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="inventory"><h5>Product Inventory: </h5></label>
                    <input
                      type="number"
                      min="0"
                      required
                      onChange={(evt) => this.handleChange(evt, 'inventoryQty')}
                      name="inventoryQty"
                      value={product.inventoryQty} />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="weight"><h5>Product Weight: </h5></label>
                    <input
                      required
                      type="number"
                      min="0"
                      onChange={(evt) => this.handleChange(evt, 'pdtWt')}
                      name="pdtWt"
                      value={product.pdtWt} />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="image"><h5>Product Image: </h5></label>
                    <input
                      onChange={(evt) => this.handleChange(evt, 'image')}
                      name="image"
                      value={product.image} />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="price"><h5>Product Price: </h5></label>
                    <input
                      type="number"
                      min="0"
                      required
                      onChange={(evt) => this.handleChange(evt, 'priceActual')}
                      name="priceActual"
                      value={product.priceActual} />
                  </div>
                </section>
              </form>
            </div>
            :
            <h2>You must be an Admin to edit products</h2>
        }

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    products: state.products,
    errorMessage: state.errorMessage
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadProducts() {
      dispatch(fetchProducts());
    },
    createProduct(product) {
      dispatch(addProduct(product, ownProps.history))
    },
    clearError() {
      dispatch(newErrorMessage(''))
    }
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProduct));
