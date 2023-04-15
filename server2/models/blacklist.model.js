const mongoose = require("mongoose");

const blacklistModel = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

const Blacklist = mongoose.model("blacklist", blacklistModel);

module.exports = { Blacklist };
