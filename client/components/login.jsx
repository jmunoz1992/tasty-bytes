import React from 'react';
import { connect } from 'react-redux';
import { login as loginFromReducer} from '../store/user';
import { ErrorMessage } from './index';
import { newErrorMessage } from '../store/index'
import { Input, Icon, Button } from 'react-materialize';

/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
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
        <h5 style={{'fontFamily': 'Georgia, serif'}}>Please log in your email and password below</h5>
          <br />
          <form onSubmit={this.onLoginSubmit}>
            <div className="form-group">
              <Input s={6}
                name="email"
                type="email"
                className="form-control"
                placeholder="email"
                required
                validate>
                <Icon>email</Icon>
              </Input>
            </div>
            <div className="form-group">
                <Input s={6}
                name="password"
                type="password"
                className="form-control"
                placeholder="password"
                required
                validate>
                <Icon>lock</Icon>
              </Input>
            </div>
            <div classname="center-align">
              <button
              type="submit"
              className="btn btn-primary"
              style={{ 'backgroundColor': '#000000', 'color': '#ffffff', 'borderRadius': '10px' }}
              >{message}</button>
            </div>
          </form>
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
      </div>
    );
  }

  onLoginSubmit(event) {
    event.preventDefault();
    this.props.login({
      email: event.target.email.value,
      password: event.target.password.value
    });
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => ({
   message: 'Log in',
   errorMessage: state.errorMessage
  });
const mapDispatch = (dispatch, ownProps) => ({
  login: credentials => {
    dispatch(loginFromReducer(credentials, ownProps.history))
  },
    clearError() {
      dispatch(newErrorMessage(''))
    }
});

export default connect(mapState, mapDispatch)(Login);




// import React from 'react'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
// import { auth } from '../store'

// /**
//  * COMPONENT
//  */
// const AuthForm = (props) => {
//   const { name, displayName, handleSubmit, error } = props

//   return (
//     <div>
//       <form onSubmit={handleSubmit} name={name}>
//         {
//           displayName === "Sign Up" ?
//             <div>
//               <div>
//                 <label htmlFor="username"><small>Username</small></label>
//                 <input name="username" type="text" />
//               </div>
//               <div>
//                 <label htmlFor="fullName"><small>Full Name</small></label>
//                 <input name="fullName" type="text" />
//               </div>
//             </div>
//             :
//             <div />
//         }
//         <div>
//           <label htmlFor="email"><small>Email</small></label>
//           <input name="email" type="text" />
//         </div>
//         <div>
//           <label htmlFor="password"><small>Password</small></label>
//           <input name="password" type="password" />
//         </div>
//         <div>
//           <button type="submit">{displayName}</button>
//         </div>
//         {error && error.response && <div> {error.response.data} </div>}
//       </form>
//       <a href="/auth/google">{displayName} with Google</a>
//     </div>
//   )
// }

// /**
//  * CONTAINER
//  *   Note that we have two different sets of 'mapStateToProps' functions -
//  *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
//  *   function, and share the same Component. This is a good example of how we
//  *   can stay DRY with interfaces that are very similar to each other!
//  */
// const mapLogin = (state) => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.user.error
//   }
// }

// const mapSignup = (state) => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.user.error
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const email = evt.target.email.value
//       const password = evt.target.password.value
//       const username = evt.target.username ? evt.target.username.value : null
//       const name = evt.target.fullName ? evt.target.fullName.value : null
//       dispatch(auth(email, password, username, name, formName))
//     }
//   }
// }

// export const Login = connect(mapLogin, mapDispatch)(AuthForm)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

// /**
//  * PROP TYPES
//  */
// AuthForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object
// }


