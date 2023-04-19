const { WebSocketServer } = require("ws");

const ws = new WebSocketServer({ port: 4000 });

ws.on("connection", (socket) => {
  console.log("A new client got connected");

  socket.on("message", (msg) => {
    console.log(msg.toString());
  });

  socket.on("close", () => {
    console.log("client got disconnected");
  });
});
