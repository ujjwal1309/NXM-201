let db;

db.assignment2.aggregate([
  {
    $match: {
      pop: {
        $lte: 5000,
      },
    },
  },
  {
    $group: {
      _id: "$state",
      total_pop: {
        $sum: "$pop",
      },
    },
  },
  {
    $sort: {
      total_pop: -1,
    },
  },
  {
    $skip: 2,
  },
  {
    $limit: 2,
  },
  {
    $project: {
      total_pop: 1,
      state: "$_id",
      _id: 0,
    },
  },
]);

db.categories.aggregate([
  {
    $graphlookup: {
      from: "categories",
      startwith: "_id",
      connectFromField: "_id",
      connectToField: "parent",
      as: "subcategories",
    },
  },
]);
