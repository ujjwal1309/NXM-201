const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");

const app = express();

const server = createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A client got connected");
  socket.emit("hello", "hello from server");
});

io.on("close", () => {
  console.log("client got disconnected");
});

app.get("/", (req, res) => {
  res.send("base end point");
});

server.listen(4000, () => {
  console.log("Server is connected");
});
