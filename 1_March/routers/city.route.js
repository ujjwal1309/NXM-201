const express=require("express");
const { auth } = require("../middlewares/auth");
const { getCityData } = require("../controllers/city.controller");
const { redisLimiter } = require("../middlewares/redislimiter");

const cityRouter=express.Router();

cityRouter.get("/p",(req,res)=>{
    res.send("home")
})

cityRouter.get("/",auth,redisLimiter,getCityData);

cityRouter.get("/:city",auth,redisLimiter,getCityData);

module.exports={cityRouter}