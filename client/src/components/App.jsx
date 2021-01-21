/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ReviewList from './ReviewList';
import RatingsCount from './RatingsCount';
import WriteReview from './WriteReview';
import AveragedReviews from './AveragedReviews';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      ratings: [],
      ratingsCount: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      },
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.calculateRatings = this.calculateRatings.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }

  componentDidMount() {
    axios.get('/api/products/80/reviews')
      .then((data) => {
        const sorted = data.data.sort(this.sortByNewest);
        this.setState({
          reviews: sorted,
        });
        this.calculateRatings();
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get('/api/products/80/reviews/ratings')
      .then((ratings) => {
        this.setState({
          ratings: ratings.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSelectChange(event) {
    const sortMethod = event.target.value || 'most-recent';
    let sorted = this.state.reviews;
    if (sortMethod === 'most-recent') {
      sorted = sorted.sort(this.sortByNewest);
      this.setState({
        reviews: sorted,
      });
    } else if (sortMethod === 'oldest') {
      sorted = sorted.sort(this.sortByOldest);
      this.setState({
        reviews: sorted,
      });
    } else if (sortMethod === 'most-helpful') {
      sorted = sorted.sort(this.sortByHelpful);
      this.setState({
        reviews: sorted,
      });
    } else if (sortMethod === 'highest-lowest') {
      sorted = sorted.sort(this.sortByHighestToLowest);
      this.setState({
        reviews: sorted,
      });
    } else if (sortMethod === 'lowest-highest') {
      sorted = sorted.sort(this.sortByLowestToHighest);
      this.setState({
        reviews: sorted,
      });
    }
  }

  handleModalOpen() {
    const modal = document.getElementById('write-review-modal');
    modal.style.display = 'block';
  }

  getReviews(productId) {
    axios.get(`/api/products/${productId}/reviews`)
      .then((data) => {
        this.setState({
          reviews: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getRatings(productId) {
    axios.get(`/api/products/${productId}/reviews/ratings`)
      .then((ratings) => {
        this.setState({
          ratings: ratings.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  calculateRatings() {
    const ratings = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };
    this.state.reviews.forEach((review) => {
      ratings[review.ratings.overall] += 1;
    });
    this.setState({
      ratingsCount: ratings,
    });
    return ratings;
  }

  submitReview(review) {
    const currentReviews = this.state.reviews;
    axios.post('/api/products/reviews', review)
      .then((response) => {
        console.log(response);
        review.review_id = response.data;
        currentReviews.unshift(review);
        this.setState({
          reviews: currentReviews,
        });
      });
  }

  sortByNewest(a, b) {
    const date1 = new Date(a.review_date).getTime();
    const date2 = new Date(b.review_date).getTime();
    return date1 > date2 ? -1 : 1;
  }

  sortByOldest(a, b) {
    const date1 = new Date(a.review_date).getTime();
    const date2 = new Date(b.review_date).getTime();
    return date1 < date2 ? -1 : 1;
  }

  sortByHelpful(a, b) {
    return b.helpful.yes - a.helpful.yes;
  }

  sortByHighestToLowest(a, b) {
    return b.ratings.overall - a.ratings.overall;
  }

  sortByLowestToHighest(a, b) {
    return a.ratings.overall - b.ratings.overall;
  }

  render() {
    return (
      <div className="main-div">
        <div className="header-div">
          <span className="header-name">Reviews</span>
          <button type="button" className="write-review" onClick={this.handleModalOpen}>Write a review</button>
        </div>
        <div id="write-review-modal">
          <WriteReview submitReview={this.submitReview} />
        </div>
        <div className="review-info">
          <section className="review-stars-total">
            <RatingsCount
              reviews={this.state.reviews}
              ratings={this.state.ratingsCount}
              calculateRatings={this.calculateRatings}
            />
          </section>
          <AveragedReviews ratings={this.state.ratings} />
          <section className="sorting-section" onChange={this.handleSelectChange}>
            <span>Sort By:</span>
            <select name="sort" id="sort" className="review-sorter">
              <option value="most-recent">Most Recent</option>
              <option value="oldest">Oldest</option>
              <option value="most-helpful">Most Helpful</option>
              <option value="highest-lowest">Highest To Lowest</option>
              <option value="lowest-highest">Lowest To Highest</option>
            </select>
          </section>
        </div>
        <ReviewList reviews={this.state.reviews} lastIndex={this.state.reviews.length - 1} />
      </div>
    );
  }
}

export default App;
