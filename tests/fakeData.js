const fakeData = {
  reviews: [{
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
  }],
  ratings: {
    overall: 5,
    quality: 5,
    durability: 5
  },
  ratingsCount: {
    5: 1,
    4: 2,
    3: 3,
    2: 4,
    1: 5,
  },
};

module.exports = fakeData;