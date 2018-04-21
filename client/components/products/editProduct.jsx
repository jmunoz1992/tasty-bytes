import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProductCardView} from '../index';
import { fetchProducts, editProduct } from '../../store';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { Button } from 'react-materialize';

export class EditProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      prodName: this.props.product.title.slice(0)
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
      product: productInfo
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let product = this.state.product
    this.props.handleEdit()
    this.props.editProduct(product)
  }

  render() {
    const product = this.state.product;
    const user = this.props.user;
    let isAdmin = false;
    if (user) {
      isAdmin = user.isAdmin
    }
    return (
      <div className="center-align in-front" >
        {
          isAdmin ?
            <div>
              <h2>Editing: {this.state.prodName}</h2>
              <form className="addProd" onSubmit={(event) => { this.handleSubmit(event) }} >
                <Button onClick={this.handleSubmit} >Update Product</Button>
                <section>
                  <div className="inputGroup">
                    <label htmlFor="title"><h5>Product Name: </h5></label>
                    <input required onChange={(evt) => this.handleChange(evt, 'title')} name="title" value={product.title} />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="shortDesc"><h5>Product Short Description: </h5></label>
                    <textarea onChange={(evt) => this.handleChange(evt, 'shortDescription')} name="shortDescription" value={product.shortDescription} />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="fullDesc"><h5>Product Full Description: </h5></label>
                    <textarea onChange={(evt) => this.handleChange(evt, 'fullDescription')} name="fullDescription" value={product.fullDescription} />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="inventory"><h5>Product Inventory: </h5></label>
                    <input type="number" min="0" required onChange={(evt) => this.handleChange(evt, 'inventoryQty')} name="inventoryQty" value={product.inventoryQty} />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="weight"><h5>Product Weight: </h5></label>
                    <input required type="number" min="0" onChange={(evt) => this.handleChange(evt, 'pdtWt')} name="pdtWt" value={product.pdtWt} />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="image"><h5>Product Image: </h5></label>
                    <input onChange={(evt) => this.handleChange(evt, 'image')} name="image" value={product.image} />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="price"><h5>Product Price: </h5></label>
                    <input type="number" min="0" required onChange={(evt) => this.handleChange(evt, 'priceActual')} name="priceActual" value={product.priceActual} />
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
    products: state.products
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadProducts() {
      dispatch(fetchProducts());
    },
    editProduct(product) {
      dispatch(editProduct(product, ownProps.history))
    }
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProduct));
