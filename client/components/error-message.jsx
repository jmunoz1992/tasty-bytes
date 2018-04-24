import React from 'react';

export const ErrorMessage = (props) => {
  const { errorMessage, clearError } = props;
  return (
    <div className="review-item pop-up">
      <div className="review-content">
    <h1>ERROR:</h1>
    <h3>{errorMessage}</h3>
    <button onClick= {clearError}>
              [X] Close
              </button>
      </div>
    </div >
  );
};


