import React from 'react';
import {Link} from 'react-router-dom'

export const ProductCardView = (props) => {
    const {title, shortDescription, priceActual, image, id} = props.product;
    return (
        <div className="col s12 m6 center-align">
          <div className="card blue-grey darken-1 center-align">
            <div className="card-content white-text center-align">
              <span className="card-title" id="title">{title}</span>
              <img src={image} alt="Chocolate" height="100" width="100" />
              <p id="shortDescrip">{shortDescription} </p>
              <br />
              <p id="priceActual">${priceActual} </p>
              <p>NUM STARS</p>
              <p>NUM REVIEWS</p>
            </div>
            <div>
              <Link to={`/products/${id}`}>See Details</Link>
              &nbsp; &nbsp; &nbsp;
              <a onClick={() => {props.updateCart(id)}}>Add to Cart</a>
            </div>
          </div>
        </div>
    );
};


