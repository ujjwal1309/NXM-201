const express = require("express");
const Sequelize = require("sequelize");

const seq = new Sequelize("new", "root", "Jujutsu@1309", {
  host: "localhost",
  dialect: "mysql",
});

const students = seq.define("Students", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  age: Sequelize.NUMBER
});

const app = express();

app.get("/students",async(req,res)=>{
    try {
        const data=await students.findAll();
        res.status(200).json({isError:false},data)
    } catch (error) {
        res.status(404).json({isError:true,error})
    }
})

app.listen(4000, async () => {
  try {
    await seq.sync();
    console.log("server is running");
  } catch (error) {
    console.log(error);
  }
});

