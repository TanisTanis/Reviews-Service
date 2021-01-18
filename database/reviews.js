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
});

const findAverage = (obj, numOfItems) => {
  // for (key in obj) {
  //   obj[key] = obj[key] / numOfItems;
  // };
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] !== '$init') {
      obj[keys[i]] = obj[keys[i]] / numOfItems;
    }
  }
  return obj;
};

const Review = mongoose.model('review', reviewSchema);

module.exports.Review = Review;
module.exports.findAverage = findAverage;
