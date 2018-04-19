import React, {Component} from 'react';
import { connect } from 'react-redux';
import { UserCardView } from './user-card.jsx';
import {fetchUsers, updateUser, deleteUser} from '../store/index.js'


export class AllUsers extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    const {users, toggleAdmin, removeUser} = this.props;
    return (
      <div className="center-align">
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
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUsers() {
      dispatch(fetchUsers());
    },
    removeUser(event, userId) {
      console.log("ID HERE", userId)
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
