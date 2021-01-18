import React from 'react';
import ReviewListItem from './ReviewListItem';

// class ReviewList extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {};
//   }

//   render() {
//     return (
//       <div className="review-list">
//         {this.props.reviews.map((review, index, collection) => (
//           <ReviewListItem review={review} key={review + collection} />
//         ))}
//       </div>
//     );
//   }
// }

const ReviewList = (props) => (
  <div className="review-list-container">
    {props.reviews.map((review) => (
      <ReviewListItem review={review} key={review.user + review.review_id} />
    ))}
  </div>
);

export default ReviewList;
