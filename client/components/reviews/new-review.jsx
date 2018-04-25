import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReview } from '../../store';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button } from 'react-materialize';

export class NewReview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      review: {
        productId: this.props.product.id,
        userId: this.props.user.id,
        title: '',
        content: '',
        imgUrl: '',
        numStars: 0,
      },
      errors: [],
      dirty: false,
    }
  }

  handleChange = (event, field) => {
    let reviewInfo = Object.assign({}, this.state.review)
    const value = event.target.value;
    reviewInfo[field] = value;

    this.setState({
      review: reviewInfo,
      dirty: true,
    }, this.validate)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let review = this.state.review
    this.props.createReview(review)
  }

  validate = () => {
    let errors = [];
    let review = this.state.review
    if (this.state.dirty) {
      if (!review.title.length) errors.push('Review title is required');
      if (!review.content.length) errors.push('Review Content is required');
      if (!review.numStars.length) errors.push('Number of Stars is required');
      if (review.numStars < 0 || review.numStars > 5) errors.push('Number of Stars must be between 0 and 5');
    }
    this.setState({
      errors: errors
    })
  }

  render() {
    const { reviews, user } = this.props;
    const review = this.state.review;
    let disableSubmit = ((this.state.errors && this.state.errors.length) || !this.state.dirty) ? true : false;
    return (
      <div className="center-align">
        {
          user.email ?
            <div>
              <h2>Write A Review</h2>
              <div className="errorMessage">
              {
                this.state.errors.length ?
                <h5>{this.state.errors.join(`, `)}</h5>
                :
                <div />
              }
              </div>
              <form className="addRev" onSubmit={(event) => { this.handleSubmit(event) }} >
                <Button
                onClick={this.handleSubmit}
                disabled={disableSubmit}
                >Add Review
                </Button>
                <section>
                <row>
                  <div className="col s2" />
                  <div className="col s8">
                  <div className="inputGroup">
                    <label htmlFor="title"><h5>Review Title: </h5></label>
                    <input
                      required
                      onChange={(evt) => this.handleChange(evt, 'title')}
                      name="title"
                      value={review.title}
                    />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="content"><h5>Review Content: </h5></label>
                    <textarea
                      required
                      onChange={(evt) => this.handleChange(evt, 'content')}
                      name="content"
                      value={review.content}
                    />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="numStars"><h5>Number of Stars:</h5></label>
                    <input
                      className="col s1"
                      required
                      type="number"
                      min="0"
                      max="5"
                      onChange={(evt) => this.handleChange(evt, 'numStars')}
                      name="numStars"
                      value={review.numStars}
                      text-align="right"
                    />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="imgUrl"><h5>Product Image: </h5></label>
                    <input
                      onChange={(evt) => this.handleChange(evt, 'imgUrl')}
                      name="imgUrl"
                      value={review.imgUrl}
                      />
                  </div>
                  </div>
                  </row>
                </section>
              </form>
            </div>
            :
            <h2>You must be logged in to write a review</h2>
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
    createReview(review) {
      dispatch(addReview(review));
    },
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NewReview));
