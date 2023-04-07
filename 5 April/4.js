let db;

db.assignment3.aggregate([
  {
    $group: {
      _id: "$name",
      total_orders: {
        $sum: "$orders.quantity",
      },
    },
  },
]);

db.assignment3.aggregate([
  {
    $unwind: "$orders",
  },
  {
    $group: {
      _id: "$name",
      total_quantity: {
        $sum: "$orders.quantity",
      },
    },
  },
]);

db.assignment3.aggregate([
  { $unwind: "$orders" },
  {
    $group: {
      _id: "$name",
      price: { $sum: "$orders.price" },
      quantity: { $sum: "$orders.quantity" },
    },
  },
  {
    $project: {
      total_price: { $multiply: ["$price", "$quantity"] },
    },
  },
]);

db.assignment3.aggregate([
  {
    $unwind: "$orders",
  },
  {
    $group: {
      _id: "$name",
      total_price: {
        $sum: { $multiply: ["$orders.price", "$orders.quantity"] },
      },
    },
  },
]);

//   { _id: 'John', total_price: 3000 },
//   { _id: 'Jane', total_price: 1300 },
//   { _id: 'Bob', total_price: 1000 }

//------------------------------------------------------------------------------------------->

// { _id: 'Jane', total_price: 2400 },
// { _id: 'Bob', total_price: 2700 },
// { _id: 'John', total_price: 6000 }

db.assignment3.aggregate([
  { $unwind: "$orders" },
  {
    $group: {
      _id: "$name",
      total_price: {
        $sum: { $multiply: ["$orders.price", "$orders.quantity"] },
      },
    },
  },
]);

db.assignment3.aggregate([
  { $unwind: "$orders" },
  {
    $group: {
      _id: "$name",
      total_price: {
        $sum: { $multiply: ["$orders.price", "$orders.quantity"] },
      },
      orders: {
        $sum: 1,
      },
    },
  },
  {
    $project: {
      _id: 1,
      avg_price: {
        $divide: ["$total_price", "$orders"],
      },
    },
  },
]);

// Here's the corrected query to find the average price of all orders for each customer:

db.assignment3.aggregate([
  { $unwind: "$orders" },
  {
    $group: {
      _id: "$name",
      avg_price: { $avg: "$orders.price" },
    },
  },
]);

//Write an aggregation pipeline to get the highest price of all orders for each customer.

db.assignment3.aggregate([
  {
    $unwind: "$orders",
  },
  {
    $sort: {
      "orders.price": 1,
    },
  },
  {
    $group: {
      _id: "$name",
      address: {
        $last: "$address",
      },
      orders: {
        $last: "$orders",
      },
    },
  },
]);

// Write an aggregation pipeline to get the lowest price of all orders for each customer.

db.assignment3.aggregate([
  { $unwind: "$orders" },
  {
    $group: {
      _id: "$name",
      price: {
        $min: "$orders.price",
      },
    },
  },
]);

// Write an aggregation pipeline to get the total number of orders and the total price of all orders for each customer.

db.assignment3.aggregate([
  { $unwind: "$orders" },
  {
    $group: {
      _id: "$name",
      total_orders: {
        $sum: 1,
      },
      total_price: {
        $sum: {
          $multiply: ["$orders.price", "$orders.quantity"],
        },
      },
    },
  },
]);

// Write an aggregation pipeline to get the total number of orders and the average price of all orders for each customer.

db.assignment3.aggregate([
  { $unwind: "$orders" },
  {
    $group: {
      _id: "$name",
      avg_price: {
        $avg: "$orders.price",
      },
      total_orders: {
        $sum: 1,
      },
    },
  },
]);
