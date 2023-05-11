const jwt = require("jsonwebtoken");
const { redisClient } = require("../helpers/redis");

const auth = async (req, res, next) => {
    try {
        
        const token=req.headers.authorization?.split(" ")[1];
    
        if(!token) return res.status(401).send("Please login again");
        //Blacklisting
    
        const isBlacklisted=await redisClient.get(token);
    
        if(isBlacklisted) return res.send("Unauthorized");
    
        //token check
        const isValid=jwt.verify(token,"ssj");
    
        if(!isValid) return res.send("please login again");
    
        //set userId in req body
    
        req.userId=isValid.userId;
        req.preferred_city=isValid.preferred_city;
        next();
    } catch (error) {
        res.send(error.message);
    }

};

module.exports={auth}
