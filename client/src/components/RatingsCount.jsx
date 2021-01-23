/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';

const RatingsCount = (props) => {
  const [ratings, setRatings] = useState(props.ratings);

  useEffect(() => { setRatings(props.calculateRatings()); }, [props.reviews]);

  return (
    <div className="rating-snapshot">
      <div>
        <span className="rating-snapshot-text">Rating Snapshot</span>
      </div>
      <div>
        <span className="rating-number">5</span>
        {' '}
        <span className="rating-snapshot-star">★</span>
        {': '}
        <span className="rating-result">{ratings[5]}</span>
      </div>
      <div>
        <span className="rating-number">4</span>
        {' '}
        <span className="rating-snapshot-star">★</span>
        {': '}
        <span className="rating-result">{ratings[4]}</span>
      </div>
      <div>
        <span className="rating-number">3</span>
        {' '}
        <span className="rating-snapshot-star">★</span>
        {': '}
        <span className="rating-result">{ratings[3]}</span>
      </div>
      <div>
        <span className="rating-number">2</span>
        {' '}
        <span className="rating-snapshot-star">★</span>
        {': '}
        <span className="rating-result">{ratings[2]}</span>
      </div>
      <div>
        <span className="rating-number">1</span>
        {' '}
        <span className="rating-snapshot-star">★</span>
        {': '}
        <span className="rating-result">{ratings[1]}</span>
      </div>
    </div>
  );
};

export default RatingsCount;
