import React from 'react';
import ReviewListItem from './ReviewListItem';

const ReviewList = (props) => (
  <div className="review-list-container">
    {props.reviews.map((review, index) => (
      <ReviewListItem
        review={review}
        key={review.user + review.review_id}
        index={index}
        lastIndex={props.lastIndex}
      />
    ))}
  </div>
);

export default ReviewList;
