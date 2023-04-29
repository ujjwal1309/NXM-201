const express = require("express");
const socket_io = require("socket.io");
const http = require("http");
const { userJoin, getAllUser, getCurrentUser } = require("./utils/user");
const { formatMessage } = require("./utils/messages");
const app = express();

const server = http.createServer(app);

const io = socket_io(server);

const defaultNPS = io.of("/");

defaultNPS.on("connection", (socket) => {
  console.log("one user has joined the chat");

  socket.on("joinRoom", ({ username, room }) => {
    console.log(username, +room);
    const users = userJoin(socket.id, username, room);
    socket.join(users.room);

    //welcome message

    socket.emit("message", formatMessage("server", `welcome to ${room}`));

    //Broadcast message to others user

    socket.broadcast
      .to(users.room)
      .emit(
        "message",
        formatMessage("server", `${username} has joined the chat`)
      );

    io.to(room).emit("roomUsers", {
      room: users.room,
      users: getAllUser(users.room),
    });

    socket.on("chatMessage", (msg) => {
      const user = getCurrentUser(socket.id);

      io.to(user.room).emit("message", formatMessage(user.username, msg));
    });
  });

  socket.on("disconnect", () => {
    console.log("One user left the chat");
    const users=getCurrentUser(socket.id)
    console.log(users)
    io.broadcast.to(users.room).emit("message",formatMessage("server",`${users.username} has left the chat`));
  });
});

server.listen("7000", () => {
  console.log("Server is running");
});
