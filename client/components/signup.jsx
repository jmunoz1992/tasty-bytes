import React from 'react';
import { connect } from 'react-redux';
import { signup as signupFromReducer } from '../store/user';
import {Row, Input} from 'react-materialize';

/* -----------------    COMPONENT     ------------------ */

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
            <form onSubmit={this.onSignupSubmit}>
              <Row>
                  <Input s={6} label="Full Name" name="name" />
                  <Input type="email" label="Email" s={12} name="email" />
                  <Input s={6} label="Username" name="username" />
                  <Input type="password" label="Password" s={12} name="password" />
              </Row>
              <button type="submit" className="btn btn-block btn-primary">{message}</button>
            </form>
          </div>
          <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/auth/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>{message} with Google</span>
            </a>
          </p>
        </div>
      </div>
    );
  }

  onSignupSubmit(event) {
    event.preventDefault();
    this.props.signup({
      name: event.target.name.value,
      email: event.target.email.value,
      username: event.target.username.value,
      password: event.target.password.value
    });
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Signup' });
const mapDispatch = (dispatch, ownProps) => ({
  signup: credentials => dispatch(signupFromReducer(credentials, ownProps.history))
});

export default connect(mapState, mapDispatch)(Signup);
