const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 4000 });

wss.on("connection", (socket) => {
  console.log("A new connection joined");

  socket.on("message", (msg) => {
    
    if (msg == "hey") {
      socket.send("hello");
    } else if (msg == "bye") {
      socket.send("tata");
    }
  });

  socket.send("hello from server");
});
