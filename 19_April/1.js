const { EventEmitter } = require("events");

const player = new EventEmitter();

player.on("shot", (n) => {
  console.log(`Player ${n} got shot and is badly injured`);
});

player.emit("shot", 2);

//Emit is triggering the event