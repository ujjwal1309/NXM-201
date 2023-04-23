const { WebSocket, WebSocketServer } = require("ws");

const fs = require("fs");

const wss = new WebSocketServer({ port: 7000 });

let chat=[["hello how are you","ujjwal"],["I am fine and wbu","Sumit"]]

wss.on("connection", (socket) => {
  console.log("A client got connected");

  socket.send(JSON.stringify(chat));

  socket.on("message", function message(data, isBinary) {
    data = data.toString().split("|");
    let msg = data[0],
      name = data[1];
    chat.push([msg, name]);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(chat), { binary: isBinary });
      }
    });
  });
});
