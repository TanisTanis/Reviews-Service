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
  }

  componentDidMount() {
    axios.get('/api/products/60/reviews')
      .then((data) => {
        this.setState({
          reviews: data.data,
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

  render() {
    return (
      <div className="main-div">
        <div className="header-div">
          <span className="header-name">Reviews</span>
          <button type="button" className="write-review">Write a review</button>
        </div>
        <div className="review-info">
          <section className="review-stars-total">Review Numbers</section>
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
          <section className="sorting-section">
            <span>Sort By:</span>
            <select name="sort" id="sort">
              <option value="most-recent">Most Recent</option>
              <option value="oldest">Oldest</option>
            </select>
          </section>
        </div>
        <ReviewList reviews={this.state.reviews} lastIndex={this.state.reviews.length - 1} />
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
