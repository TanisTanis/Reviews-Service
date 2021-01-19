/* eslint-disable object-shorthand */
/* eslint-disable no-param-reassign */
/* eslint-disable operator-assignment */
/* eslint-disable no-unused-vars */
const db = require('../../database');

function getReviews(id, num, callback) {
  db.Review.find({
    review_id: {
      $gte: id,
      $lte: id + num,
    },
  }, (err, data) => {
    if (err) {
      callback(err);
    }
    callback(null, data);
  });
}

function getAverageRatings(id, num, callback) {
  db.Review.find({
    review_id: {
      $gte: id,
      $lte: id + num,
    },
  })
    .then((data) => {
      const ratings = {
        overall: 0,
        quality: 0,
        durability: 0,
      };
      data.forEach((review) => {
        const keys = Object.keys(review.ratings);
        keys.forEach((category) => {
          ratings[category] = ratings[category] + review.ratings[category];
        });
      });
      db.findAverage(ratings, num + 1);
      callback(ratings);
    });
}

function incrementYes(query, callback) {
  db.Review.find(query)
    .then((data) => {
      const yesCount = data[0].helpful.yes;
      db.Review.findOneAndUpdate(query, { 'helpful.yes': yesCount + 1 }, { rawResult: true })
        .then((response) => {
          callback(null, response);
        });
    })
    .catch((err) => {
      callback(err);
    });
}

function incrementNo(query, callback) {
  db.Review.find(query)
    .then((data) => {
      const noCount = data[0].helpful.no;
      db.Review.findOneAndUpdate(query, { 'helpful.no': noCount + 1 }, { rawResult: true })
        .then((response) => {
          callback('response');
        });
    })
    .catch((err) => {
      callback(err);
    });
}

function addReview(reqbody, callback) {
  const {
    user, location, reviewDate, title, body,
  } = reqbody;
  let verified;
  let recommended;

  if (reqbody.recommended.toLowerCase() === 'true') {
    recommended = true;
  } else {
    recommended = false;
  }

  if (reqbody.verified_user.toLowerCase() === 'true') {
    verified = true;
  } else {
    verified = false;
  }
  const newPost = {
    user: user,
    location: location,
    review_count: reqbody.review_count,
    review_date: reviewDate,
    title: title,
    body: body,
    recommended: recommended,
    verified_user: verified,
    ratings: {
      overall: reqbody.ratings.overall,
      quality: reqbody.ratings.quality,
      durability: reqbody.ratings.durability,
    },
    helpful: {
      yes: 0,
      no: 0,
    },
  };

  db.Review.findOne({}).sort('-review_id')
    .then((data) => {
      const newId = data.review_id + 1;
      newPost.review_id = newId;
      db.Review.create(newPost)
        .then((response) => {
          callback(null, response);
        });
    })
    .catch((err) => {
      callback(err);
    });
}

module.exports = {
  getReviews,
  getAverageRatings,
  incrementYes,
  incrementNo,
  addReview,
};
