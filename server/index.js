/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');

const app = express();
const PORT = 3000;
const db = require('../database');

app.use(express.static('public'));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
