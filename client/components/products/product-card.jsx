import React from 'react';
import { Link } from 'react-router-dom'

export const ProductCardView = (props) => {
  const { title, shortDescription, priceActual, image, id } = props.product;
  let isAdmin = false;
  if (props.user) {
    isAdmin = props.user.isAdmin
  }
  console.log('getting into product card view')
  return (
    <div className="col s12 m6 center-align">
      <div className="card blue-grey darken-1 center-align">
        <div className="card-content white-text center-align">
          <Link to={`/products/${id}`}><span className="card-title" id="title">{title}</span></Link>
          <Link to={`/products/${id}`}><img src={image} alt="Chocolate" height="100" width="100" /></Link>
          <p id="shortDescrip">{shortDescription} </p>
          <br />
          <p id="priceActual">${priceActual} </p>
          <p>NUM STARS</p>
          <p>NUM REVIEWS</p>
        </div>
        <div>
          <Link to={`/products/${id}`}>See Details</Link>
          &nbsp; &nbsp; &nbsp;
          <Link to='#' onClick={() => { props.updateCart(id) }}>Add to Cart</Link>
          <br />
          {
            isAdmin ?
              <div>
                <Link to={'#'} onClick={() => props.removeProduct(id)}>Delete Product</Link>
              </div>
              :
              <div />
          }
        </div>
      </div>
    </div>
  );
};


