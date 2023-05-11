const { format, createLogger, transports } = require("winston");
const { MongoDB } = require("winston-mongodb");

const logger = createLogger({
  level: "info",
  format: format.json(),
  transports: [
    new MongoDB({
      db: "mongodb://127.0.0.1:27017/eval4",
      collection: "logs",
      options: {
        useUnifiedTopology: true,
      },
    }),
  ],
});

module.exports = { logger };
