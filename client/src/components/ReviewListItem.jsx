/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import moment from 'moment';

const ReviewListItem = (props) => {
  function starFormatter(num) {
    let stars = '';
    for (let i = 0; i < num; i += 1) {
      stars += '*';
    }
    return stars;
  }

  function recommendedFormatter(boolean) {
    if (boolean) {
      return (
        <span className="recommended">
          ✔
          <span className="yes-no-rec">
            Yes
          </span>
          , I recommend this product.
        </span>
      );
    }
    return (
      <span className="recommended">
        ✘
        <span className="yes-no-rec">
          No
        </span>
        , I don't recommend this product.
      </span>
    );
  }

  function reviewClass(index) {
    if (index === 0) {
      return 'first-review';
    }
    if (index === props.lastIndex) {
      return 'last-review';
    }
    return 'review';
  }

  return (
    <div className={reviewClass(props.index)}>
      <section className="name-location">
        <div className="name">{props.review.user}</div>
        <div className="location">{props.review.location}</div>
        <div className="review-count">
          Review
          {' '}
          <span className="review-number">
            {props.review.review_count}
          </span>
        </div>
      </section>
      <section className="main-review">
        <span className="gold-stars">{starFormatter(props.review.ratings.overall)}</span>
        <span className="grey-stars">{starFormatter(5 - props.review.ratings.overall)}</span>
        {/* <span className="stars">{starFormatter(props.review.ratings.overall)}</span> */}
        {' - '}
        <span className="date">{moment(props.review.review_date).fromNow()}</span>
        <div className="review-body">
          <span className="title">{props.review.title}</span>
          <div className="body">
            {props.review.body}
          </div>
          <div className="recommended">
            {recommendedFormatter(props.review.recommended)}
          </div>
        </div>
      </section>
      {props.review.verified_user ? (
        <span className="verified-user">
          <span className="star">*</span>
          Verified Purchaser
        </span>
      ) : null}
    </div>
  );
};

export default ReviewListItem;
