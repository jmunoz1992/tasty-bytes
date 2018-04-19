import React from 'react';
// import { Link } from 'react-router';
// import { priceString } from 'APP/app/utils';

export const ProductCardView = (props) => {
  const {title, shortDescription, priceActual, image} = props.product;
  return (
      <div className="col s12 m6 center-align">
        <div className="card blue-grey darken-1 center-align">
          <div className="card-content white-text center-align">
            <span className="card-title">{title}</span>
            <img src={image} alt="Chocolate" height="100" width="100" />
            <p>{shortDescription} </p>
            <br />
            <p>{priceActual} </p>
            <p>NUM STARS</p>
            <p>NUM REVIEWS</p>
          </div>
          <div className="card-action">
            <a href="#">See Details</a>
            <a href="#">Add to Cart</a>
          </div>
        </div>
      </div>
  );
};
