import React, {Component} from 'react';
import { connect } from 'react-redux';
import { UserCardView } from './user-card.jsx';
import {fetchUsers} from '../store/index.js'


export class AllUsers extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    const {users} = this.props;
    return (
      <div className="center-align">
        <h1>ALL USERS</h1>
        <div className="center-align">
          <div className="row">
            {users && users.map(user => {
              return <UserCardView key={user.id} user={user} />
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllUsers);
