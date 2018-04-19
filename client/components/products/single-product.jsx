import React, {Component} from 'react';
import store, {fetchProducts} from '../../store';
import { Button, NavItem, Dropdown, Tabs, Tab } from 'react-materialize';


export default class SingleProduct extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount () {
    const fetchThunk = fetchProducts();
    store.dispatch(fetchThunk);
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
      this.unsubscribe();
  }

  render() {
    const {products} = this.state;
    const productId = +(window.location.pathname).split('/')[2];
    const productSelected = products.filter(product => product.id === productId)[0];
    console.log('selected product ', productSelected);
    return (
        <div className="center-align">
          {productSelected ?
            <div className="row center-align">
            <div className="col s3 m3 center-align"></div>

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
                    <Dropdown trigger={
                        <Button>Qty</Button>
                      }>
                      <NavItem>1</NavItem>
                      <NavItem>2</NavItem>
                      <NavItem divider />
                      <NavItem>3</NavItem>
                    </Dropdown>
                    <Button>ADD TO CART</Button>
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
