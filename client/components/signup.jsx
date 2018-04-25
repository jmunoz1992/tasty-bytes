import React from 'react';
import { connect } from 'react-redux';
import { signup as signupFromReducer } from '../store/user';
import {Row, Input} from 'react-materialize';
import { ErrorMessage } from './index';
import { newErrorMessage } from '../store/index'

/* -----------------    COMPONENT     ------------------ */

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
      <div className="container center-align" style={{'width': '500px'}}>
      {
        this.props.errorMessage.length ?
        <ErrorMessage
        errorMessage={this.props.errorMessage}
        clearError={this.props.clearError}
        />
        :
        <div />
      }
        <div className="buffer local">
            <h5 style={{'fontFamily': 'Georgia, serif'}}>Please fill in the required fields below</h5>
            <br />
            <form onSubmit={this.onSignupSubmit}>
              <Row>
                  <Input
                    s={12}
                    label="Full Name"
                    name="name"
                    required
                    validate
                  />
                  <Input
                    type="email"
                    label="Email"
                    s={12}
                    name="email"
                    required
                    validate
                  />
                  <Input
                    s={12}
                    label="Username"
                    name="username"
                    required
                    validate
                  />
                  <Input
                    type="password"
                    label="Password"
                    s={12}
                    name="password"
                    required
                    validate
                  />
              </Row>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ 'backgroundColor': '#000000', 'color': '#ffffff', 'borderRadius': '10px' }}>
                {message}
              </button>
            </form>
          </div>
          <div classname="center-align">
            <p>OR</p>
            <a
              target="_self"
              href="/auth/google"
              className="btn btn-social btn-google"
              style={{ 'backgroundColor': '#000000', 'color': '#ffffff', 'borderRadius': '10px' }}
              >
              <i className="fa fa-google" />
              <span>{message} with Google</span>
            </a>
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

const mapState = (state) => ({
  message: 'Signup',
  errorMessage: state.errorMessage
});
const mapDispatch = (dispatch, ownProps) => ({
  signup: credentials => {
    dispatch(signupFromReducer(credentials, ownProps.history))
  },
  clearError() {
    dispatch(newErrorMessage(''))
  }
});

export default connect(mapState, mapDispatch)(Signup);
