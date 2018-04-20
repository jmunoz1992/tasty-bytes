import React, {Component} from 'react';
import { connect } from 'react-redux';
import { UserCardView } from './user-card.jsx';
import {fetchUsers, updateUser, deleteUser} from '../store/index.js'


export class AllUsers extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    const {users, toggleAdmin, removeUser, authMessage} = this.props;
    return (
      <div className="center-align">
      {
        authMessage ?
        <h2>{authMessage}</h2>
        :
        <div>
        <h1>ALL USERS</h1>
        <div className="center-align">
          <div className="row">
            {users && users.map(user => {
              return <UserCardView
              key={user.id}
              user={user}
              toggleAdmin={toggleAdmin}
              removeUser={removeUser}
              />
            })}
          </div>
        </div>
        </div>
          }

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    authMessage: state.authMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUsers() {
      dispatch(fetchUsers());
    },
    removeUser(event, userId) {
      event.preventDefault();
      return dispatch(deleteUser(userId));
    },
    toggleAdmin(event, userId, updates) {
      event.preventDefault();
      return dispatch(updateUser(userId, updates));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllUsers);
