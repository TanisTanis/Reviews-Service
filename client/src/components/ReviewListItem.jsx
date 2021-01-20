/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';

const ReviewListItem = (props) => {
  const [helpfulYes, setYes] = useState(props.review.helpful.yes);
  const [helpfulNo, setNo] = useState(props.review.helpful.no);
  function starFormatterFull(num) {
    let stars = '';
    for (let i = 0; i < num; i += 1) {
      stars += '★';
    }
    return stars;
  }

  function starFormatterEmpty(num) {
    let stars = '';
    for (let i = 0; i < num; i += 1) {
      stars += '☆';
    }
    return stars;
  }

  function recommendedFormatter(boolean) {
    if (boolean) {
      return (
        <span className="recommended">
          ✔
          {' '}
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
        {' '}
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

  function handleHelpfulYesClick(event) {
    const id = event.target.name;
    axios.patch(`/api/products/${id}/reviews/yes`)
      .then(() => {
        document.getElementById(`${id}Yes`).setAttribute('disabled', 'true');
        document.getElementById(`${id}No`).setAttribute('disabled', 'true');
        setYes(props.review.helpful.yes + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleHepfulNoClick(event) {
    const id = event.target.name;
    axios.patch(`/api/products/${id}/reviews/no`)
      .then(() => {
        document.getElementById(`${id}Yes`).setAttribute('disabled', 'true');
        document.getElementById(`${id}No`).setAttribute('disabled', 'true');
        setNo(props.review.helpful.no + 1);
      })
      .catch((err) => {
        console.log(err);
      });
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
        <span className="gold-stars">{starFormatterFull(props.review.ratings.overall)}</span>
        <span className="grey-stars">{starFormatterEmpty(5 - props.review.ratings.overall)}</span>
        <span className="seperator">{' · '}</span>
        <span className="date">{moment(props.review.review_date).fromNow()}</span>
        <div className="review-body">
          <span className="title">{props.review.title}</span>
          <div className="body">
            {props.review.body}
          </div>
          <div className="recommended">
            {recommendedFormatter(props.review.recommended)}
          </div>
          <div className="helpful">
            <span>Helpful?</span>
            <button className="yes-no" type="button" name={props.review.review_id} id={`${props.review.review_id}Yes`} onClick={handleHelpfulYesClick}>
              Yes
              {' · '}
              <span className="yes">{helpfulYes}</span>
            </button>
            <button className="yes-no" type="button" name={props.review.review_id} id={`${props.review.review_id}No`} onClick={handleHepfulNoClick}>
              No
              {' · '}
              <span className="no">{helpfulNo}</span>
            </button>
          </div>
        </div>
      </section>
      {props.review.verified_user ? (
        <span className="verified-user">
          <span className="verified-star">{'✪  '}</span>
          Verified Purchaser
        </span>
      ) : null}
    </div>
  );
};

export default ReviewListItem;
