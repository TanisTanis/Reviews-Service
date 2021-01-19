/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ReviewList from './ReviewList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      ratings: [],
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    axios.get('/api/products/60/reviews')
      .then((data) => {
        const sorted = data.data.sort(this.sortByNewest);
        this.setState({
          reviews: sorted,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get('/api/products/60/reviews/ratings')
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
    const sortMethod = event.target.value;
    if (sortMethod === 'most-recent') {
      let sorted = this.state.reviews;
      sorted = sorted.sort(this.sortByNewest);
      this.setState({
        reviews: sorted,
      });
    } else if (sortMethod === 'oldest') {
      let sorted = this.state.reviews;
      sorted = sorted.sort(this.sortByOldest);
      this.setState({
        reviews: sorted,
      });
    } else if (sortMethod === 'most-helpful') {
      let sorted = this.state.reviews;
      sorted = sorted.sort(this.sortByHelpful);
      this.setState({
        reviews: sorted,
      });
    }
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

  render() {
    return (
      <div className="main-div">
        <div className="header-div">
          <span className="header-name">Reviews</span>
          <button type="button" className="write-review">Write a review</button>
        </div>
        <div className="review-info">
          <section className="review-stars-total">Rating Snapshot ☆</section>
          <section className="averaged-reviews">
            Average Customer Ratings
            <div className="ratings overall">
              Overall:
              {' '}
              {this.state.ratings.overall}
            </div>
            <div className="ratings quality">
              Quality:
              {' '}
              {this.state.ratings.quality}
            </div>
            <div className="ratings durability">
              Durability:
              {' '}
              {this.state.ratings.durability}
            </div>
          </section>
          <section className="sorting-section" onChange={this.handleSelectChange}>
            <span>Sort By:</span>
            <select name="sort" id="sort">
              <option value="most-recent">Most Recent</option>
              <option value="oldest">Oldest</option>
              <option value="most-helpful">Most Helpful</option>
            </select>
          </section>
        </div>
        <ReviewList reviews={this.state.reviews} lastIndex={this.state.reviews.length - 1} />
        <svg width="100" height="200">
          <polygon points="100,10 40,198 190,78 10,78 160,198" />
        </svg>
      </div>
    );
  }
}

// function App() {
//   const [state, setState] = useState(false);
//   const [reviews, setReviews] = useState(() => {
//     axios.get('/api/products/1/reviews')
//       .then((data) => {
//         setReviews(data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   useEffect(() => {
//     axios.get('/api/products/1/reviews')
//       .then((data) => {
//         setReviews(data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   function handleClick() {
//     if (state === false) {
//       setState(true);
//     } else {
//       setState(false);
//     }
//   }

//   function getReviews() {
//     useEffect(() => {
//       axios.get('/api/products/1/reviews')
//         .then((data) => {
//           setReviews(data.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     });
//   }

//   return (
//     <div className="main-div">
//       <h1>Hello World With React!</h1>
//       { state ? <h2>You suck!</h2> : null}
//       <button type="button" onClick={handleClick}>Change</button>
//       {/* <ReviewList reviews={reviews} reviewHandler={setReviews} getReviews={getReviews} /> */}
//     </div>
//   );
// }

export default App;
