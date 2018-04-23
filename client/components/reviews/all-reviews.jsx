import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReviewCardView } from './review-card.jsx';
import { fetchProducts, fetchReviewsByProd } from '../../store';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

export function AllReviews (props) {
    const { products, reviews, user } = props;
    let isAdmin = false;
    if (user) {
      isAdmin = user.isAdmin
    }

    return (
      <div id="all-reviews">
        {reviews.length && reviews.map(review => {
          return (
            <ReviewCardView
              key={review.id}
              review={review}
              user={user} />
          );
        })}
      </div>
    );
}

const mapStateToProps = state => {
  return {
    reviews: state.reviews,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadReviews(prodId) {
      dispatch(fetchReviewsByProd(prodId));
    },
  };
};

export default withRouter(connect(
  mapStateToProps,
  null
)(AllReviews));
