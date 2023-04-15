const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("all users");
});

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserModel.find({ email });

    if (user.length) {
      return res
        .status(400)
        .json({ msg: "user already existed. Please Login" });
    }

    const hashedPassword = bcrypt.hashSync(password, 5);

    const newUser = new UserModel({ name, email, password: hashedPassword });

    await newUser.save();

    res.status(200).json({ msg: "user has been successfully registered" });
  } catch (error) {
    res.status(400).json({ msg: "error", error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    console.log(user[0]);
    if (!user.length) {
      return res.status(401).json({ msg: "email and password doesn't match" });
    }

    const isMatched = bcrypt.compareSync(password, user[0].password);

    if (!isMatched) {
      return res.status(401).json({ msg: "password doesn't match" });
    }

    const token = jwt.sign({ _id: user[0]._id }, "ssj", {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ _id: user[0]._id }, "ssj2", {
      expiresIn: "7d",
    });

    console.log(token, refreshToken);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      expires: new Date(Date.now() + 3600000),
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      expires: new Date(Date.now() + 604800000),
    });

    res.status(200).json({ msg: "successfully logged in" });
  } catch (error) {
    res.status(400).json({ msg: "error", error: error.message });
  }
});

userRouter.get("/token", (req, res) => {
  const token = req.cookies.token;
  const refreshToken = req.cookies.refreshToken;
  res.status(200).json({ token, refreshToken });
});

module.exports = { userRouter };
