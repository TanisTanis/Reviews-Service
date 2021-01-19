/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/reviews', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const reviewSchema = new mongoose.Schema({
  review_id: Number,
  user: String,
  location: String,
  review_count: Number,
  review_date: String,
  title: String,
  body: String,
  recommended: Boolean,
  verified_user: Boolean,
  ratings: {
    overall: Number,
    quality: Number,
    durability: Number,
  },
  helpful: {
    yes: Number,
    no: Number,
  },
});

const findAverage = (obj, numOfItems) => {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) {
    if (keys[i] !== '$init') {
      let newNum = obj[keys[i]] / numOfItems;
      newNum = newNum.toFixed(1);
      obj[keys[i]] = newNum;
    }
  }
  return obj;
};

const Review = mongoose.model('review', reviewSchema);

module.exports.Review = Review;
module.exports.findAverage = findAverage;
