/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';

const AveragedReviews = (props) => {
  const [ratings, setRatings] = useState(props.ratings);

  useEffect(() => {
    setRatings(props.ratings);
  }, [props.ratings]);

  function getStars(rating) {
    const percent = Math.floor((rating / 5) * 100);
    return percent;
  }

  return (
    <section className="averaged-reviews">
      Average Customer Ratings
      <div className="ratings overall">
        Overall:
        {'  '}
        <span
          className="averaged-review-stars"
          style={{
            background: `linear-gradient(90deg, gold, gold ${getStars(ratings.overall)}%, transparent, transparent ${getStars(ratings.overall)}%)`,
            WebkitTextStroke: '1px goldenrod',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ★★★★★
        </span>
      </div>
      <div className="ratings quality">
        Quality:
        {'  '}
        <span
          className="averaged-review-stars"
          style={{
            background: `linear-gradient(90deg, gold, gold ${getStars(ratings.quality)}%, transparent, transparent ${getStars(ratings.quality)}%)`,
            WebkitTextStroke: '1px goldenrod',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ★★★★★
        </span>
      </div>
      <div className="ratings durability">
        Durability:
        {'  '}
        <span
          className="averaged-review-stars"
          style={{
            background: `linear-gradient(90deg, gold, gold ${getStars(ratings.durability)}%, transparent, transparent ${getStars(ratings.durability)}%)`,
            WebkitTextStroke: '1px goldenrod',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ★★★★★
        </span>
      </div>
    </section>
  );
};

export default AveragedReviews;
