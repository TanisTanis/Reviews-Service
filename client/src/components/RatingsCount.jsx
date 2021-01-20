/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';

const RatingsCount = (props) => {
  const [ratings, setRatings] = useState(props.ratings);

  useEffect(() => {
    setRatings(props.calculateRatings());
  }, [props.reviews]);

  return (
    <div className="rating-snapshot">
      <div className="rating-snapshot-text">
        Rating Snapshot
      </div>
      <div>
        <span className="rating-number">5</span>
        {' '}
        <span className="rating-snapshot-star">★</span>
        {': '}
        {ratings[5]}
      </div>
      <div>
        <span className="rating-number">4</span>
        {' '}
        <span className="rating-snapshot-star">★</span>
        {': '}
        {ratings[4]}
      </div>
      <div>
        <span className="rating-number">3</span>
        {' '}
        <span className="rating-snapshot-star">★</span>
        {': '}
        {ratings[3]}
      </div>
      <div>
        <span className="rating-number">2</span>
        {' '}
        <span className="rating-snapshot-star">★</span>
        {': '}
        {ratings[2]}
      </div>
      <div>
        <span className="rating-number">1</span>
        {' '}
        <span className="rating-snapshot-star">★</span>
        {': '}
        {ratings[1]}
      </div>
      <div>
        <span className="rating-number">0</span>
        {' '}
        <span className="rating-snapshot-star">★</span>
        {': '}
        {ratings[0]}
      </div>
    </div>
  );
};

export default RatingsCount;
