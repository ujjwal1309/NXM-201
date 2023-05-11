const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { redisClient } = require("../helpers/redis");
const { User } = require("../models/user.model");

const signup = async (req, res) => {
  const { name, email, password, preferred_city } = req.body;
  try {
    const isUser = await User.findOne({ email });

    if (isUser) res.send("user already sent");

    const hashedPass = bcrypt.hashSync(password, 5);

    const newUser = new User({
      name,
      email,
      password: hashedPass,
      preferred_city,
    });

    await newUser.save();

    res.send("Signup successfull");
  } catch (error) {
    console.log(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUser = await User.findOne({ email });

    if (!isUser) res.send("Email and Password Doesn't match");

    const isPassword = bcrypt.compareSync(password, isUser.password);

    if (!isPassword) res.send("password doesn't match");

    const token = jwt.sign({ userId: isUser._id, preferred_city: isUser.preferred_city },"ssj");


    res.send({ token });
  } catch (error) {
    res.send(error.message);
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token)

    if (!token) return res.status(403);

    redisClient.set(token, 1);

    const c=await redisClient.get(token);
    console.log(c)

    res.send("logout successful");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports={signup,login,logout};
