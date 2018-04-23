import React from 'react';
import { FiveStars } from '../index'

export const ReviewCardView = (props) => {
  const { title, content, numStars, imgUrl } = props.review;
  let isAdmin = false;
  if (props.user) {
    isAdmin = props.user.isAdmin
  }
  return (
    <div className="review-item">
      <div className="review-content">
        <FiveStars numStars={numStars} />
        <p id="numStars">{numStars} Stars</p>
        <h5 id="title"><em>Subject: </em>{title}</h5>
        {
          imgUrl ?
            <img src={imgUrl} height="80" width="80" />
            :
            <div />
        }
        <p id="content"><em>Review: </em>{content} </p>
        <br />

      </div>
    </div >
  );
};


