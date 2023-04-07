let db;

//find largest population city in every state

db.assignment2.aggregate([
  {
    $group: {
      _id: "$state",
      total_population: {
        $sum: "$pop",
      },
    },
  },
  {
    $sort: {
      total_population: -1,
    },
  },
  {
    $limit: 1,
  },
]);

// { _id: 'NY', city: 'ELMIRA', pop: 111396 },
// { _id: 'DC', city: 'WASHINGTON', pop: 62924 },
// { _id: 'SC', city: 'YEMASSEE', pop: 66990 },
// { _id: 'ND', city: 'ZAHL', pop: 42195 },
// { _id: 'AK', city: 'KETCHIKAN', pop: 32383 },
// { _id: 'NC', city: 'WARNE', pop: 69179 },
// { _id: 'MS', city: 'WOODLAND', pop: 46968 },
// { _id: 'IA', city: 'DAVENPORT', pop: 52105 },
// { _id: 'KY', city: 'WHITE MILLS', pop: 46563 },
// { _id: 'CO', city: 'VAIL', pop: 59418 },
// { _id: 'UT', city: 'DAMMERON VALLEY', pop: 55999 },
// { _id: 'MI', city: 'WATTON', pop: 84712 },
// { _id: 'NJ', city: 'HIGHLAND PARK', pop: 69646 },
// { _id: 'NE', city: 'WHITNEY', pop: 35325 },
// { _id: 'MN', city: 'WARROAD', pop: 51421 },
// { _id: 'PA', city: 'READING', pop: 80454 },
// { _id: 'OK', city: 'WISTER', pop: 45542 },
// { _id: 'ME', city: 'VASSALBORO', pop: 40434 },
// { _id: 'WY', city: 'THAYNE', pop: 33107 },
// { _id: 'MO', city: 'SPRINGFIELD', pop: 54994 }

//correct

db.assignment2.aggregate([
  {
    $sort: {
      pop: 1,
    },
  },
  {
    $group: {
      _id: "$state",
      city: {
        $last: "$city",
      },
      state: {
        $max: "$pop",
      },
    },
  },
]);

db.assignment2.aggregate([
  {
    $group: {
      _id: "$state",
      total_city: {
        $sum: 1,
      },
      total_pop: {
        $sum: "$pop",
      },
    },
  },
  {
    $project: {
      _id: 1,
      avg_pop: {
        $divide: ["$total_pop", "$total_city"],
      },
    },
  },
]);

db.assignment2.aggregate([
  {
    $group: {
      _id: {
        state: "$state",
        city: "$city",
      },
      pop: { $sum: "$pop" },
    },
  },
  {
    $group: {
      _id: "$_id.state",
      avg_pop: { $avg: "$population" },
    },
  },
]);

db.assignment2.aggregate([
  {
    $sort: {
      pop: 1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      city: 1,
      pop:1
    },
  },
]);
