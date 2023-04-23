const { WebSocket, WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 4000 });

const candidates = [
  { id: 1, name: "modi", votes: 0, voters:[] },
  { id: 2, name: "rahul", votes: 0,voters:[] },
  { id: 3, name: "yogi", votes: 0,voters:[] },
];

wss.on("connection", (socket) => {
  console.log("A client got connected");

  socket.send(JSON.stringify(candidates));

  //Broadcasting the data

  socket.on("message", function message(data, isBinary) {
    data=data.toString().split("|");
    let id=+data[0],name=data[1];
    data=data.toString();
    candidates.forEach(el=>{
      if(el.id===id) {
        el.votes++
      };
      el.voters.push(name)
    })
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(candidates), { binary: isBinary });
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("A client got disconnected");
  });
});
