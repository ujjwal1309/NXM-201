const express = require("express");
const { connect } = require("./config/db");
const { userRouter } = require("./routers/user.route");
const { auth } = require("./middlewares/auth");
const { cityRouter } = require("./routers/city.route");
const { logger } = require("./middlewares/logger");
const { log, error } = require("winston");

const app = express();
app.use(express.json());

app.use((err, req, res, next) => {
  // Log the error using the logger
  logger.log("error",err.message);
  
  // Send an error response to the client
  res.status(500).json({ error: "Internal server error" });
});

app.get("/", (req, res) => {
  takenfjqfj
  res.send("Home page");

});

app.use("/users", userRouter);
app.use("/weather",cityRouter);

app.get("/post", auth, (req, res) => {
  console.log(req.userId, req.preferred_city);
  res.send({msg:"posts"});
});

app.listen(4000, async () => {
  try {
    await connect;
    logger.log("info","db is connected")
  } catch (error) {
    console.log(error);
    logger.log("error",error)
  }
  console.log("server is running");
});
