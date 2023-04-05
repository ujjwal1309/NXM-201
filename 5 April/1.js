let db;

db.heroes.find({
  health: 40,
});

db.heroes.find({
  metadata: {
    favouriteColor: "red",
    age: 44,
  },
});

//That is how i can access all the nested objects

db.heroes.find({
  "metadata.favouriteColor": "red",
});

db.heroes.find({
  "metadata.age": {
    $lt: 50,
  },
});

// {
//     "name": "IronMan",
//     "powers": ["robot", "money"],
//     "health": 33,
//     "coin":[1,2,3,4,5],
//     "villains": [
//       { "name": "Mandarin", "health": 50 },
//       { "name": "Titanium Man", "health": 54 }
//     ],
//     "metadata": { "favouriteColor": "red", "age": 13 }
//   },

db.heroes.find({
  powers: "magic",
});

db.heroes.find({
  $and: [{ powers: "money" }, { powers: "intelligence" }],
});

db.heroes.find({
  powers: {
    $all: ["money", "intelligence"],
  },
});

db.heroes.find({
  powers: {
    $size: 1,
  },
});

db.heroes.find({
  villains: {
    $elemMatch: { name: "Hela" },
  },
});

db.heroes.find({
  "villains.name": "Hela",
});

db.heroes.find(
  {},
  {
    name: 1,
    powers: 1,
  }
);
