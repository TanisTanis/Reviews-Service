/* eslint-disable operator-assignment */
/* eslint-disable object-shorthand */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');

const app = express();
const PORT = 3000;
const db = require('../database');

app.use(express.static('public'));
app.use(express.json());

app.get('/api/products/:itemid/reviews', (req, res) => {
  const reviewId = parseInt(req.params.itemid, 10);
  const numOfItems = 5;
  db.Review.find({
    review_id: {
      $gte: reviewId,
      $lte: reviewId + numOfItems,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get('/api/products/:itemid/reviews/ratings', (req, res) => {
  const reviewId = parseInt(req.params.itemid, 10);
  const numOfItems = 5;
  db.Review.find({
    review_id: {
      $gte: reviewId,
      $lte: reviewId + numOfItems,
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
      db.findAverage(ratings, numOfItems + 1);
      res.send(ratings);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post('/api/products/reviews', (req, res) => {
  const {
    user, location, reviewDate, title, body,
  } = req.body;
  const recommend = req.body.recommended;
  let recommended;

  if (recommend.toLowerCase() === 'true') {
    recommended = true;
  } else {
    recommended = false;
  }

  db.Review.findOne({}).sort('-review_id')
    .then((data) => {
      const newId = data.review_id + 1;
      db.Review.create({
        review_id: newId,
        user: user,
        location: location,
        review_date: reviewDate,
        title: title,
        body: body,
        recommended: recommended,
        ratings: {
          overall: req.body.ratings.overall,
          quality: req.body.ratings.quality,
          durability: req.body.ratings.durability,
        },
      })
        .then(() => {
          res.send('Successful addition to database!');
        });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.patch('/api/products/:itemid/reviews/yes', (req, res) => {
  const reviewId = parseInt(req.params.itemid, 10);
  const query = { review_id: reviewId };
  db.Review.find(query)
    .then((data) => {
      const yesCount = data[0].helpful.yes;
      db.Review.findOneAndUpdate(query, { 'helpful.yes': yesCount + 1 }, { rawResult: true })
        .then((response) => {
          res.send(response);
        });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.patch('/api/products/:itemid/reviews/no', (req, res) => {
  const reviewId = parseInt(req.params.itemid, 10);
  const query = { review_id: reviewId };
  db.Review.find(query)
    .then((data) => {
      const noCount = data[0].helpful.no;
      db.Review.findOneAndUpdate(query, { 'helpful.no': noCount + 1 })
        .then(() => {
          res.send('Successful patch');
        });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
