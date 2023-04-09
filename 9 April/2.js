let db;

db.users.aggregate([
  {
    $lookup: {
      from: "zipcode",
      localField: "address",
      foreignField: "address",
      as: "address",
    },
  },
]);
//------------------------------------------------------------------------------------------->

db.users.aggregate([
  {
    $lookup: {
      from: "zipcode",
      localField: "address",
      foreignField: "address",
      as: "address",
    },
  },
  {
    $unwind: "$address",
  },
  {
    $lookup: {
      from: "city",
      localField: "address.zipcode",
      foreignField: "zipcode",
      as: "zipcode",
    },
  },
  {
    $unwind: "$zipcode",
  },
  {
    $lookup: {
      from: "country",
      localField: "zipcode.state",
      foreignField: "state",
      as: "country",
    },
  },
]);
