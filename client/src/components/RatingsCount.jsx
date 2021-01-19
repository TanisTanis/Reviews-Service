/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';

const RatingsCount = (props) => {
  const [ratings, setRatings] = useState(props.ratings);

  useEffect(() => {
    setRatings(props.calculateRatings());
  });

  return (
    <div className="rating-snapshot">
      <div className="rating-snapshot-text">
        Rating Snapshot
      </div>
      <div>
        <span className="rating-number">5</span>
        {' '}
        ☆
        {': '}
        {ratings[5]}
      </div>
      <div>
        <span className="rating-number">4</span>
        {' '}
        ☆
        {': '}
        {ratings[4]}
      </div>
      <div>
        <span className="rating-number">3</span>
        {' '}
        ☆
        {': '}
        {ratings[3]}
      </div>
      <div>
        <span className="rating-number">2</span>
        {' '}
        ☆
        {': '}
        {ratings[2]}
      </div>
      <div>
        <span className="rating-number">1</span>
        {' '}
        ☆
        {': '}
        {ratings[1]}
      </div>
      <div>
        <span className="rating-number">0</span>
        {' '}
        ☆
        {': '}
        {ratings[0]}
      </div>
    </div>
  );
};

export default RatingsCount;
