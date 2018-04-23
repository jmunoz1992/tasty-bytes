import React from 'react';
import { Link } from 'react-router-dom'
import Ratings from 'react-ratings-declarative';

export default function FiveStars (props)  {
  const { numStars } = props;

  return (
        <Ratings
          rating={numStars}
          widgetDimensions="40px"
          widgetSpacings="15px"
        >
          <Ratings.Widget widgetRatedColor="yellow" widgetSpacing="10px" widgetDimension="30px" />
          <Ratings.Widget widgetRatedColor="yellow" widgetSpacing="10px" widgetDimension="30px" />
          <Ratings.Widget widgetRatedColor="yellow" widgetSpacing="10px" widgetDimension="30px" />
          <Ratings.Widget widgetRatedColor="yellow" widgetSpacing="10px" widgetDimension="30px" />
          <Ratings.Widget widgetRatedColor="yellow" widgetSpacing="10px" widgetDimension="30px" />
        </Ratings>
  );
}


