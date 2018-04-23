import React from 'react';
import { Link } from 'react-router-dom'
import { FiveStars } from '../index';

export const ProductCardView = (props) => {
  const { title, shortDescription, priceActual, image, id, avgRating, reviews } = props.product;
  let isAdmin = false;
  if (props.user) {
    isAdmin = props.user.isAdmin
  }
  return (
    <div className="col s12 m6 center-align">
      <div className="card blue-grey darken-1 center-align">
        <div className="card-content white-text center-align">
          <Link to={`/products/${id}`}><span className="card-title" id="title">{title}</span></Link>
          <Link to={`/products/${id}`}><img src={image} alt="Chocolate" height="100" width="100" /></Link>
          <p id="shortDescrip">{shortDescription} </p>
          <br />
          <p id="priceActual">${priceActual} </p>
          {
            avgRating ?
            <div>
            <FiveStars numStars={avgRating} />
            <p>{reviews.length} Review(s)</p>
            </div>
            :
            <p>No Reviews for this Product</p>
          }
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


