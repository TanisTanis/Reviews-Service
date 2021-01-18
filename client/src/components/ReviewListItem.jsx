import React from 'react';
import moment from 'moment';

const ReviewListItem = (props) => (
  <div className="review">
    <section className="name-location">
      <div className="name">{props.review.user}</div>
      <div className="location">{props.review.location}</div>
      <div className="review-count">
        Review <span className="review-number">{props.review.review_count}</span>
      </div>
    </section>
    <section className="main-review">
      <span className="stars"></span>
      <span className="date">{moment(props.review.review_date).fromNow()}</span>
      <div className="review-body">
        <span className="title">{props.review.title}</span>
        <div className="body">
          {props.review.body}
        </div>
      </div>
    </section>
  </div>
);

export default ReviewListItem;
