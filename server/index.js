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

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
