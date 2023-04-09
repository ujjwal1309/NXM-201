const express = require("express");
const { connection } = require("./config/db");
const { postModel } = require("./models/model");

const app = express();

app.get("/", async (req, res) => {
  try {
    const posts = await postModel.find().populate("users");

    res.send(posts);
  } catch (error) {
    res.send(error);
  }
});

app.listen(4000, async () => {
  try {
    console.log("server is running");
    await connection;
    console.log("db connected");
  } catch (error) {
    console.log("db isn't connected");
    console.log(error);
  }
});

[
  {
    _id: 1,
    name: "John",
    age: 25,
    address: "123 Main St",
  },

  {
    _id: 2,
    name: "Jane",
    age: 35,
    address: "456 Main St",
  },

  {
    _id: 3,
    name: "Bob",
    age: 45,
    address: "789 Main St",
  },

  {
    _id: 4,
    name: "Alice",
    age: 55,
    address: "246 Main St",
  },
];
