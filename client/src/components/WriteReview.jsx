/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const WriteReview = (props) => {
  const [rating, setRating] = useState('');
  const [ratingClick, setRatingClick] = useState(false);
  const [title, setTitle] = useState('');

  function textHandler(num) {
    if (num === 1) {
      return 'Poor';
    } else if (num === 2) {
      return 'Fair';
    } else if (num === 3) {
      return 'Average';
    } else if (num === 4) {
      return 'Good';
    } else if (num === 5) {
      return 'Excellent';
    }
  }

  function addCheck(elementClass) {
    document.getElementById(elementClass).style.display = 'inline-block';
  }

  function starHandler(num) {
    const div = document.getElementById('star-describer');
    div.textContent = textHandler(num);
    const colors = ['blue', 'red', 'orange', 'yellow', 'lawngreen', 'green'];
    for (let i = 1; i <= num; i += 1) {
      document.getElementById(`${i}`).style.color = colors[num];
    }
    for (let i = num + 1; i <= 5; i += 1) {
      document.getElementById(`${i}`).style.color = 'black';
    }
  }

  function starClick(event) {
    const userRating = parseInt(event.target.id, 10);
    if ((event.type === 'click' && ratingClick) || !ratingClick) {
      starHandler(userRating);
    }
    if (event.type === 'click') {
      setRatingClick(true);
      addCheck('user-review-check');
      setRating(event.target.id);
    }
  }

  return (
    <div className="modal-content">
      <div className="modal-header">
        <span>My Review</span>
      </div>
      <div className="modal-body">
        <div className="write-rating">
          <span>Product Rating</span>
          {'  '}
          <span className="1-star write-review-star" id="1" onClick={starClick} role="button" tabIndex={0} onKeyPress={starClick} onMouseOver={starClick} onFocus={() => undefined}>★</span>
          <span className="2-star write-review-star" id="2" onClick={starClick} role="button" tabIndex={0} onKeyPress={starClick} onMouseOver={starClick} onFocus={() => undefined}>★</span>
          <span className="3-star write-review-star" id="3" onClick={starClick} role="button" tabIndex={0} onKeyPress={starClick} onMouseOver={starClick} onFocus={() => undefined}>★</span>
          <span className="4-star write-review-star" id="4" onClick={starClick} role="button" tabIndex={0} onKeyPress={starClick} onMouseOver={starClick} onFocus={() => undefined}>★</span>
          <span className="5-star write-review-star" id="5" onClick={starClick} role="button" tabIndex={0} onKeyPress={starClick} onMouseOver={starClick} onFocus={() => undefined}>★</span>
          <span className="rating-type" id="star-describer">{}</span>
          <span className="checked user-review" id="user-review-check">✔</span>
        </div>
        <div className="write-title">
          <label htmlFor="title">Review Title</label>
          <input type="text" name="title" placeholder="Ex: Great for hiking!" />
        </div>
        <div className="write-review-body">
          <span className="review-body">Review</span>
          <div>
            <textarea rows="8" cols="75" name="review-body" placeholder="Please keep your review focused on the product and your experience with it." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
