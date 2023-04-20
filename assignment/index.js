const { WebSocket, WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 4000 });

const candidates = [
  { id: 1, name: "modi", votes: 0 },
  { id: 2, name: "rahul", votes: 0 },
  { id: 3, name: "yogi", votes: 0 },
];

wss.on("connection", (socket) => {
  console.log("A client got connected");

  socket.send(JSON.stringify(candidates));

  socket.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});
