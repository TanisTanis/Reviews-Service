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
      h2: false,
      reviews: [],
      ratings: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios.get('/api/products/1/reviews')
      .then((data) => {
        this.setState({
          reviews: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get('/api/products/1/reviews/ratings')
      .then((ratings) => {
        this.setState({
          ratings: ratings.data,
        });
        console.log(this.state);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleClick() {
    this.setState({
      h2: !this.state.h2,
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
        console.log(this.state);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="main-div">
        <h1>Hello World With React!</h1>
        { this.state.h2 ? <h2>You suck!</h2> : null }
        <button type="button" onClick={this.handleClick}>Change</button>
        <div className="review-info">
          <section className="review-stars-total"></section>
          <section className="averaged-reviews">Average Customer Ratings</section>
        </div>
        <ReviewList reviews={this.state.reviews} />
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
