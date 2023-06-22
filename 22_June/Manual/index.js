const express = require("express");
const Sequelize = require("sequelize");

const app = express();

const sequelize=new Sequelize("NXM","root","ujjwal1309",{
    host:"localhost",
    dialect:"mysql"
})

const students=sequelize.define("students",{

})


app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(4000,async () => {
    try {
        await sequelize.sync();
        console.log("Server started");
    } catch (error) {
        console.log(error)
    }
});
