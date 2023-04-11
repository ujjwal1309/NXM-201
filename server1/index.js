const express = require("express");
const { connect } = require("./config/db");
const { authenticator } = require("./middleware/authenticator");

const app = express();

app.get("/", (req, res) => {
  res.send("home");
});

app.use(authenticator);

app.get("/posts", (req, res) => {
  res.send("posts");
});

app.listen(4000, async () => {
  console.log("Server is running");
  await connect;
  console.log("db is connected");
});
