const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const UserModel = mongoose.model("user", userSchema);

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

postModel = mongoose.model("post", postSchema);

module.exports = { UserModel, postModel };
