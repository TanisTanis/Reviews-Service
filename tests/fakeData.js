const fakeData = [{
  review_id: 10,
  user: "Tanis Kiel",
  location: "San Diego",
  review_count: 4,
  review_date: new Date(),
  title: "A Fake Review",
  body: "This product sucks!",
  recommended: true,
  verified_user: false,
  ratings: {
    overall: 5,
    quality: 4,
    durability: 3,
  },
  helpful: {
    yes: 2,
    no: 1,
  },
},
{
  review_id: 20,
  user: "Donald Duck",
  location: "Portugal",
  review_count: 4,
  review_date: new Date(),
  title: "A Serious Review",
  body: "This product rocks!",
  recommended: true,
  verified_user: true,
  ratings: {
    overall: 5,
    quality: 4,
    durability: 3,
  },
  helpful: {
    yes: 2,
    no: 1,
  },
}];

module.exports = fakeData;