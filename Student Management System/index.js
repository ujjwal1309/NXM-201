const express = require("express");
const db = require("./models");
const { apiRouter } = require("./routes/api.routes");

const app = express();

app.use(express.json());
app.use("/api",apiRouter);

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.listen(4000, async () => {
  try {
    await db.sequelize.sync();
    console.log("server is running");
  } catch (error) {
    console.log(error);
  }
});
