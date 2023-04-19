const express = require("express");
const { connect } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const { authenticate } = require("./middleware/authenticate");
const { Blacklist } = require("./models/blacklist.model");
const jwt = require("jsonwebtoken");
const { UserModel } = require("./models/user.model");
const { checkRole } = require("./middleware/authorization");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/users", userRouter);

app.get("/posts", authenticate, (req, res) => {
  console.log(req.user);
  res.send("posts");
});

app.post("/logout", async (req, res) => {
  const token = req.cookies.token;
  try {
    const blacklist = new Blacklist({ token });
    await blacklist.save();
    res.status(200).json({ msg: "successfully logout" });
  } catch (error) {
    res.status(400).json({ msg: "error", error: error.message });
  }
});

app.post("/refresh", async (req, res) => {
  const refresh = req.cookies.refreshToken;
  try {
    const decoded = jwt.verify(refresh, "ssj2");
    const user = await UserModel.find({ _id: decoded._id });

    if (!user.length) {
      return res.status(400).json({ msg: "unauthorized" });
    }

    const token = jwt.sign({ _id: user[0]._id }, "ssj");

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      expires: new Date(Date.now() + 3600000),
    });

    res
      .status(200)
      .json({ msg: "successfully created token with refresh token" });
  } catch (error) {
    res.status(400).json({ msg: "error", error: error.message });
  }
});

app.get(
  "/comments",
  authenticate,
  checkRole("User", "Admin", "Super_Admin"),
  (req, res) => {
    res.send("all posts");
  }
);

app.patch(
  "/comments",
  authenticate,
  checkRole("Admin", "Super_Admin"),
  (req, res) => {
    res.send("Comments updated");
  }
);

app.delete(
  "/comments",
  authenticate,
  checkRole("Admin", "Super_Admin"),
  (req, res) => {
    res.send("Comments deleted");
  }
);

app.listen(4000, async () => {
  try {
    console.log("server is running");
    connect;
    console.log("db is connected");
  } catch (error) {
    console.log("db isn't connected");
    console.log(error);
  }
});
