const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { Blacklist } = require("../models/blacklist.model");

const authenticate = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    const isBlacklisted = await Blacklist.find({ token });

    if (isBlacklisted.length) {
      return res.status(401).json({ msg: "token is blacklisted" });
    }

    const decoded = jwt.verify(token, "ssj");
    const { _id } = decoded;

    const user = await UserModel.find({ _id });

    if (!user.length) {
      return res.status(401).json({ msg: "Please login first" });
    }

    req.user = user[0];

    next();
  } catch (error) {
    res.status(400).json({ msg: "error", error: error.message });
  }
};

module.exports = { authenticate };
