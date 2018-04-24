import React from 'react';
import { Link } from 'react-router-dom'
import { FiveStars } from '../index';
import { Button } from 'react-materialize';

export const ProductCardView = (props) => {
  const { title, shortDescription, priceActual, image, id, avgRating, reviews } = props.product;
  console.log('props products ', props.products);
  let isAdmin = false;
  if (props.user) {
    isAdmin = props.user.isAdmin
  }
  return (
    <div className="col s6 m4 center-align">
      <div className="card brown darken-1 center-align">
        <div className="card-content white-text center-align">
          <Link to={`/products/${id}`}><span className="card-title" id="title" style={{ color: '#cfb56a' }}>{title}</span></Link>
          <Link to={`/products/${id}`}><img src={image} alt="Chocolate" height="200" width="200" /></Link>
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
        <div className="card-btns">
          <Link to={`/products/${id}`}>
            <Button
              waves='light'
              node='a'
              style={{ 'backgroundColor': '#000000', 'color': '#ffffff' }}
            >See Details
          </Button>
          </Link>
          &nbsp; &nbsp; &nbsp;

          <Button
            waves='light'
            node='a'
            style={{ 'backgroundColor': '#000000', 'color': '#ffffff' }}
            onClick={(evt) => {
              evt.preventDefault()
              props.updateCart(id)
            }}
          >Add to Cart
            </Button>
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
      </div >
    </div >
  );
};


