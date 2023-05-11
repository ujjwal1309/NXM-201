const exp = require("constants");
const express = require("express");
const http = require("http");
const socket_io = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new socket_io.Server(server);

const votes = [
  { id: 0, votes: 2, name: "A" },
  { id: 1, votes: 2, name: "B" },
  { id: 2, votes: 4, name: "C" },
];
const votersId = [];

io.on("connection", (socket) => {
  console.log("A client got connected");

  socket.emit(
    "message",
    `${JSON.stringify(votes)}|${JSON.stringify(votersId)}`
  );

  socket.on("message", (msg) => {
    msg = msg.split("|");
    let id = +msg[0],
      voterId = +msg[1];
    votersId.push(voterId);
    votes.forEach((el) => {
      if (el.id === id) {
        el.votes++;
      }
    });

    //Broadcasting the message

    io.local.emit(
      "message",
      `${JSON.stringify(votes)}|${JSON.stringify(votersId)}`
    );
  });

  socket.on("disconnect", () => {
    console.log("A client got disconnected");
  });
});

server.listen(7000, () => {
  console.log("server is connected");
});
