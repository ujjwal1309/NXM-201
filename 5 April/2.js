let db;

db.assignment1.find({
  region: "Asia",
});

db.assignment1.find({
  currency: "EUR",
});

db.assignment1.find({
  "timezones.gmtOffset": 3600,
});

db.assignment1.find({
  timezones: {
    $elemMatch: {
      gmtOffset: 3600,
      tzName: "Central European Time",
    },
  },
});

db.assignment1.find({
  "timezones.1": { $exists: true },
});

db.assignment1.find({
  "translations.kr": {
    $exists: true,
  },
});

db.assignment1.find({
    "timezones": {
      $elemMatch: {
        "gmtOffset": 3600,
        "tzName": "Central European Time"
      }
    }
  })
