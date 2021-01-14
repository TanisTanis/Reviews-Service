const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/reviews', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const reviewSchema = new mongoose.Schema({
  user: String,
  location: String,
  review_date: String,
  title: String,
  body: String,
  recommended: Boolean,
  ratings: {
    overall: Number,
    quality: Number,
    durability: Number,
  },
});

const Review = mongoose.model('review', reviewSchema);

module.exports.Review = Review;
