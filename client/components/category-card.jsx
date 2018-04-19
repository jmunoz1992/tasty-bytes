import React from 'react';

export const CategoryCardView = (props) => {
  const { id, name, description } = props.category;
  return (
    <div className="col s12 m4 center-align">
      <div className="card blue-grey darken-1 center-align">
        <div className="card-content white-text center-align">
          <span className="card-title">{name}</span>
          <p>{description} </p>
        </div>
        <div className="card-action">
          <button onClick={(event) => props.removeCategory(event, id)}>Delete Category</button>
          <a href="#"><button>Edit Category</button></a>
        </div>
      </div>
    </div>
  );
};
