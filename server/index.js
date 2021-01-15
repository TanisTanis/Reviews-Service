/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');

const app = express();
const PORT = 3000;
const db = require('../database');

app.use(express.static('public'));
app.use(express.json());

app.get('/api/:id/reviews', (req, res) => {
  const reviewId = req.params.id;
  db.Review.find({ review_id: reviewId })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
