/* eslint-disable operator-assignment */
/* eslint-disable object-shorthand */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');

const app = express();
const PORT = 3000 || process.env.PORT;
const db = require('../database');
const model = require('./model');

app.use(express.static('public'));
app.use(express.json());

app.get('/api/products/:itemid/reviews', (req, res) => {
  const reviewId = parseInt(req.params.itemid, 10);
  const numOfItems = 5;
  model.getReviews(reviewId, numOfItems, (err, data) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.send(data);
    }
  });
});

app.post('/api/products/reviews', (req, res) => {
  const info = req.body;
  model.addReview(info, (err, newId) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      // res.write(`${newId}`);
      res.send(201);
    }
  });
});

app.patch('/api/products/:itemid/reviews/yes', (req, res) => {
  const reviewId = parseInt(req.params.itemid, 10);
  const query = { review_id: reviewId };
  model.incrementYes(query, (err, response) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.send(response);
    }
  });
});

app.patch('/api/products/:itemid/reviews/no', (req, res) => {
  const reviewId = parseInt(req.params.itemid, 10);
  const query = { review_id: reviewId };
  model.incrementNo(query, (err, response) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.send(response);
    }
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
