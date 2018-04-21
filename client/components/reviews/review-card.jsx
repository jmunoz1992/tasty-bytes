import React from 'react';
import { Link } from 'react-router-dom'

export const ReviewCardView = (props) => {
  const { title, content, numStars, imgUrl, id } = props.review;
  let isAdmin = false;
  if (props.user) {
    isAdmin = props.user.isAdmin
  }
  return (
      <div className="review-item">
        <div className="review-content">
        <p id="numStars">{numStars} Stars</p>
          <h6 id="title">{title}</h6>
          {
            imgUrl ?
            <img src={imgUrl} height="80" width="80" />
            :
            <div />
          }
            <p id="content">{content} </p>
          <br />

        </div>
      </div>
  );
};


