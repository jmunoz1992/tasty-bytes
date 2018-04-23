import React from 'react';
import { Link } from 'react-router-dom'
import Ratings from 'react-ratings-declarative';

export default function FiveStars (props)  {
  const { numStars } = props;

  return (
        <Ratings
          rating={numStars}
          widgetDimensions="30px"
          widgetSpacings="5px"
        >
          <Ratings.Widget widgetRatedColor="yellow" />
          <Ratings.Widget widgetRatedColor="yellow" />
          <Ratings.Widget widgetRatedColor="yellow" />
          <Ratings.Widget widgetRatedColor="yellow" />
          <Ratings.Widget widgetRatedColor="yellow" />
        </Ratings>
  );
};


