const redis = require("ioredis");

let configuration = {
  host: "redis-17166.c305.ap-south-1-1.ec2.cloud.redislabs.com",
  port: 17166,
  username: "default",
  password: "nE0jk7JHMwk0MElVLlFB4uzoDZoSLUhs",
};

const redisClient=new redis(configuration);



module.exports = { redisClient };
