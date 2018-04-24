import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReviewCardView } from './review-card.jsx';
import { fetchProducts, fetchReviewsByUser } from '../../store';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

export class UserReviews extends Component {

  componentDidMount() {
    this.props.loadReviews(this.props.user.id);
  }

  render () {
    const { reviews, user } = this.props;
    let isAdmin = false;
    let loggedIn = false;
    if (user) {
      isAdmin = user.isAdmin
      loggedIn = !!user.id
    }

    return (
      <div>
      <h2 className="center-align">{user.email}'s Reviews</h2>
      {
        (isAdmin || loggedIn) ?
        <div id="all-reviews" className="center-align">
          {reviews.length && reviews.map(review => {
            return (
              <ReviewCardView
              className="review-item"
                key={review.id}
                review={review}
                user={user} />
            );
          })}
        </div>
        :
        <div />
      }
      </div>
    );
}
}

const mapStateToProps = state => {
  return {
    reviews: state.reviews,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadReviews(userId) {
      dispatch(fetchReviewsByUser(userId));
    },
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(UserReviews));
