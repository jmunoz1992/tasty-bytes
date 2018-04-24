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
      }
    }
  }

  handleChange = (event, field) => {
    let reviewInfo = Object.assign({}, this.state.review)
    const value = event.target.value;
    reviewInfo[field] = value;

    this.setState({
      review: reviewInfo
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let review = this.state.review
    this.props.createReview(review)
  }

  render() {
    const { reviews, user } = this.props;
    const review = this.state.review;

    return (
      <div className="center-align">
        {
          user.email ?
            <div>
              <h2>Write A Review</h2>
              <form className="addRev" onSubmit={(event) => { this.handleSubmit(event) }} >
                <Button onClick={this.handleSubmit} >Add Review</Button>
                <section>
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
                      required
                      type="number"
                      min="0"
                      max="5"
                      onChange={(evt) => this.handleChange(evt, 'numStars')}
                      name="numStars"
                      value={review.numStars}
                    />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="imgUrl"><h5>Product Image: </h5></label>
                    <input
                      onChange={(evt) => this.handleChange(evt, 'imgUrl')}
                      name="imgUrl"
                      value={review.imgUrl} />
                  </div>
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
