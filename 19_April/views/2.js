const express = require("express");
const { Server } = require("socket.io");
// const { createServer } = require("http");
const ejs = require("ejs");

const app = express();

const server = require("http").Server(app);

//res.render() and ejs file

// app.set('view engine', 'ejs');

const io = new Server(server);

io.on("connect", (socket) => {
  console.log("A client got connected");
  socket.emit("hello", "hello from server");
  socket.on("disconnect", () => {
    console.log("A user got disconnected");
  });
});

io.on("disconnect", () => {
  console.log("client got disconnected");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/2.html");
});

server.listen(4000, () => {
  console.log("Server is connected");
});
