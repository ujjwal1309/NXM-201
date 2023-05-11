const { redisClient } = require("../helpers/redis")

const redisLimiter=async(req,res,next)=>{
    try {
        
        const bool=await redisClient.get(req.ip);

        if(bool===1){
            let request=await redisClient.get(req.ip);

            if(request<3){
                redisClient.incr(req.ip);
                next();
            }else{
                return res.send("reached maximum req")
            }
        }else{
            redisClient.set(req.ip,1,"Ex",60);
            next()
        }

    } catch (error) {
        return res.send(error.message);
    }
}

module.exports={redisLimiter}