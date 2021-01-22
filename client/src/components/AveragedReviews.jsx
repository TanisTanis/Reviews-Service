/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';

const AveragedReviews = (props) => {
  const [ratings, setRatings] = useState(props.ratings);

  useEffect(() => {
    setRatings(props.ratings);
  }, [props.ratings]);

  return (
    <section className="averaged-reviews">
      <span className="average-rating-title">Average Customer Ratings</span>
      <div className="ratings overall">
        Overall:
        {' '}
        <span className="averaged-review-num">{ratings.overall}</span>
      </div>
      <div className="ratings quality">
        Quality:
        {' '}
        <span className="averaged-review-num">{ratings.quality}</span>
      </div>
      <div className="ratings durability">
        Durability:
        {' '}
        <span className="averaged-review-num">{ratings.durability}</span>
      </div>
    </section>
  );
};

export default AveragedReviews;
