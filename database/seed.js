/* eslint-disable no-console */
/* eslint-disable no-else-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */

const faker = require('faker');
const mongoose = require('mongoose');

const db = require('./reviews.js');

function trueFalseGenerator() {
  const randomNum = Math.round(Math.random());
  if (randomNum === 0) {
    return true;
  } else {
    return false;
  }
}

function numGenerator() {
  const randomNum = Math.round(Math.random() * 5);
  return randomNum;
}

const fakeData = [];

for (let i = 0; i < 100; i++) {
  const fakeReview = new db.Review({
    user: faker.name.findName(),
    location: `${faker.address.city()}, ${faker.address.state()}`,
    review_date: faker.date.recent(),
    title: faker.random.words(),
    body: faker.lorem.paragraph(),
    recommended: trueFalseGenerator(),
    ratings: {
      overall: numGenerator(),
      quality: numGenerator(),
      durability: numGenerator(),
    },
  });
  fakeData.push(fakeReview);
}

function addData() {
  db.Review.create(fakeData)
    .then((res) => {
      console.log('Database seeded successfully!');
      mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

addData();
