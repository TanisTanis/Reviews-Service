/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable object-shorthand */
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
  const [body, setBody] = useState('');
  const [recommended, setRecommended] = useState(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [required, setRequired] = useState(false);

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

  function addCheck(elementId) {
    document.getElementById(elementId).style.display = 'inline-block';
  }

  function removeCheck(elementId) {
    document.getElementById(elementId).style.display = 'none';
  }

  function starHandler(num) {
    const div = document.getElementById('star-describer');
    div.textContent = textHandler(num);
    const colors = ['blue', 'red', 'darkorange', 'teal', 'limegreen', 'green'];
    for (let i = 1; i <= num; i += 1) {
      document.getElementById(`${i}`).style.color = colors[num];
    }
    for (let i = num + 1; i <= 5; i += 1) {
      document.getElementById(`${i}`).style.color = 'black';
    }
  }

  function pranked(e) {
    e.preventDefault();
    alert('Prankd');
  }

  function starMouseLeave() {
    if (!ratingClick) {
      document.getElementById('star-describer').textContent = '';
      for (let i = 1; i <= 5; i += 1) {
        document.getElementById(`${i}`).style.color = 'black';
      }
    }
  }

  function starReset() {
    document.getElementById('star-describer').textContent = '';
    for (let i = 1; i <= 5; i += 1) {
      document.getElementById(`${i}`).style.color = 'black';
    }
  }

  function fullFormReset() {
    function resetState() {
      setRating('');
      setRatingClick(false);
      setTitle('');
      setBody('');
      setRecommended(null);
      setName('');
      setLocation('');
      setAgreed(false);
    }
    function resetChecks() {
      document.getElementById('user-review-check').style.display = 'none';
      document.getElementById('user-recommended').style.display = 'none';
      document.getElementById('user-title-check').style.display = 'none';
      document.getElementById('user-text-check').style.display = 'none';
      document.getElementById('user-name-check').style.display = 'none';
      document.getElementById('user-location-check').style.display = 'none';
    }
    function buttonReset() {
      document.getElementById('yes-button').removeAttribute('disabled');
      document.getElementById('no-button').removeAttribute('disabled');
      document.getElementById('no-button').style.backgroundColor = 'grey';
      document.getElementById('yes-button').style.backgroundColor = 'grey';
    }
    resetState();
    resetChecks();
    starReset();
    buttonReset();
    setRequired(false);
    document.getElementById('review-form').reset();
  }

  function closeModal() {
    const modal = document.getElementById('write-review-modal');
    modal.style.display = 'none';
    fullFormReset();
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

  function handleRecButton(event) {
    const eventName = event.target.id;
    addCheck('user-recommended');

    if (eventName === 'yes-button') {
      document.getElementById('yes-button').style.backgroundColor = 'darkgrey';
      document.getElementById('no-button').style.backgroundColor = 'grey';
      document.getElementById('yes-button').setAttribute('disabled', 'true');
      document.getElementById('no-button').removeAttribute('disabled');
      setRecommended(true);
    }
    if (eventName === 'no-button') {
      document.getElementById('yes-button').style.backgroundColor = 'grey';
      document.getElementById('no-button').style.backgroundColor = 'darkgrey';
      document.getElementById('yes-button').removeAttribute('disabled');
      document.getElementById('no-button').setAttribute('disabled', 'true');
      setRecommended(false);
    }
  }

  function requiredChecker() {
    let allFilled = true;
    const qualifications = [rating, title, body, name, location];
    qualifications.forEach((text) => {
      if (text === '') {
        allFilled = false;
      }
    });
    if (recommended !== null && agreed !== false && allFilled) {
      return true;
    } else {
      return false;
    }
  }

  function handleSubmit() {
    if (requiredChecker()) {
      const data = {
        user: name,
        location: location,
        review_count: Math.round(Math.random() * 5),
        review_date: new Date(),
        title: title,
        body: body,
        rating: rating,
        recommended: recommended,
        verified_user: false,
        ratings: {
          overall: rating,
          quality: Math.round(Math.random() * 5),
          durability: Math.round(Math.random() * 5),
        },
        helpful: {
          yes: 0,
          no: 0,
        },
      };
      props.submitReview(data);
      const modal = document.getElementById('write-review-modal');
      modal.style.display = 'none';
      fullFormReset();
    } else {
      setRequired(true);
    }
  }

  return (
    <div className="modal-content">
      <div className="modal-header">
        <span className="modal-title">My Review</span>
        <button className="close-modal-button" type="button" onClick={closeModal}>☒</button>
        <div className="required-asterisk">Required fields are marked with *</div>
      </div>
      {required ? (
        <div className="required-div">
          <span className="required-text">Please fill out all required fields.</span>
        </div>
      ) : null}
      <div className="modal-body">
        <div className="write-rating">
          <span id="rating-span">Product Rating</span>
          <span className="asterisk">*</span>
          {'  '}
          <span className="one-star write-review-star" id="1" onClick={starClick} role="button" tabIndex={0} onKeyPress={starClick} onMouseEnter={starClick} onMouseLeave={starMouseLeave} onFocus={() => undefined}>★</span>
          <span className="2-star write-review-star" id="2" onClick={starClick} role="button" tabIndex={-1} onKeyPress={starClick} onMouseEnter={starClick} onMouseLeave={starMouseLeave} onFocus={() => undefined}>★</span>
          <span className="3-star write-review-star" id="3" onClick={starClick} role="button" tabIndex={0} onKeyPress={starClick} onMouseEnter={starClick} onMouseLeave={starMouseLeave} onFocus={() => undefined}>★</span>
          <span className="4-star write-review-star" id="4" onClick={starClick} role="button" tabIndex={-1} onKeyPress={starClick} onMouseEnter={starClick} onMouseLeave={starMouseLeave} onFocus={() => undefined}>★</span>
          <span className="5-star write-review-star" id="5" onClick={starClick} role="button" tabIndex={0} onKeyPress={starClick} onMouseEnter={starClick} onMouseLeave={starMouseLeave} onFocus={() => undefined}>★</span>
          <span className="rating-type" id="star-describer">{ }</span>
          <span className="checked user-review" id="user-review-check">✔</span>
        </div>
        <form id="review-form">
          <div className="write-title">
            <label htmlFor="title" id="title-span">Review Title</label>
            <span className="asterisk">*</span>
            <span className="checked user-title" id="user-title-check">✔</span>
            <input
              type="text"
              id="title-input"
              name="title"
              placeholder="Ex: Great for hiking!"
              required
              onChange={(e) => {
                if (title === '') {
                  addCheck('user-title-check');
                }
                setTitle(e.target.value);
                if (e.target.value === '') {
                  removeCheck('user-title-check');
                }
              }}
            />
          </div>
          <div className="write-review-body">
            <span className="review-body">Review</span>
            <span className="asterisk">*</span>
            <span className="checked user-text" id="user-text-check">✔</span>
            <div>
              <textarea
                rows="8"
                name="review-body"
                id="body-input"
                required
                placeholder="Please keep your review focused on the product and your experience with it."
                onChange={(e) => {
                  if (body === '') {
                    addCheck('user-text-check');
                  }
                  setBody(e.target.value);
                  if (e.target.value === '') {
                    removeCheck('user-text-check');
                  }
                }}
              />
            </div>
          </div>
          <div className="write-recommended">
            <span id="recommended-span">Would you recommend this to a friend?</span>
            <span className="asterisk">*</span>
            <button type="button" id="yes-button" onClick={handleRecButton}>Yes</button>
            <button type="button" id="no-button" onClick={handleRecButton}>No</button>
            <span className="checked user-recommended" id="user-recommended">✔</span>
          </div>
          <div className="user-info">
            <span className="name-span" id="name-span">Name</span>
            <span className="asterisk">*</span>
            <input
              type="text"
              placeholder="Ex: Tom Bombadil"
              id="name-input"
              required
              onChange={(e) => {
                if (name === '') {
                  addCheck('user-name-check');
                }
                setName(e.target.value);
                if (e.target.value === '') {
                  removeCheck('user-name-check');
                }
              }}
            />
            <span className="checked user-name" id="user-name-check">✔</span>
            <span className="location-span" id="location-span">Location</span>
            <span className="asterisk">*</span>
            <input
              type="text"
              placeholder="Ex: Minas Tirith, Gondor"
              id="location-input"
              required
              onChange={(e) => {
                if (location === '') {
                  addCheck('user-location-check');
                }
                setLocation(e.target.value);
                if (e.target.value === '') {
                  removeCheck('user-location-check');
                }
              }}
            />
            <span className="checked user-location" id="user-location-check">✔</span>
          </div>
          <div className="terms">
            <input
              type="checkbox"
              id="terms-conditions"
              name="terms-conditions"
              required
              onClick={() => setAgreed(!agreed)}
            />
            <label htmlFor="terms-conditions" id="terms-conditions-label">
              I agree to the
              {' '}
              <span className="terms-and-conditions" onClick={pranked} onKeyPress={pranked}>terms and conditions</span>
              .
              <span className="asterisk">*</span>
            </label>
          </div>
          <div className="submit-div">
            <button className="submit-button" id="submit-button" type="button" onClick={handleSubmit}>Post Review</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteReview;
