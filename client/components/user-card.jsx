import React from 'react';
// import { Link } from 'react-router';
// import { priceString } from 'APP/app/utils';

export const UserCardView = (props) => {
  const { imgUrl, email, username, isAdmin, name, id } = props.user;
  const { toggleAdmin, removeUser } = props
  return (
    <div className="col s12 m4 center-align">
      <div className="card blue-grey darken-1 center-align">
        <div className="card-content white-text center-align">
          <span className="card-title">{username}</span>
          <img src={imgUrl} alt="Chocolate" height="80" width="80" />
          <p>{name} </p>
          <p>{email} </p>
          <p>{isAdmin ? 'Admin' : 'Not an Admin'} </p>
        </div>
        <div className="card-action">
          <a href="#"><button onClick={(event) => { removeUser(event, id) }}>Delete User</button></a>
          <a href="#"><button onClick={(event) => { toggleAdmin(event, id, {isAdmin: !isAdmin}) }}>{isAdmin ? 'Remove Admin' : 'Make Admin'} </button></a>
        </div>
      </div>
    </div>
  );
};
