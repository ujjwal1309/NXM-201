const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin", "Super_Admin"],
    },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
