const { sequelize, students, courses } = require("./models");

const express = require("express");

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Home");
});

//R=> findAll, findOne

app.get("/api/students", async (req, res) => {
  try {
    const data = await students.findAll();
    res.status(200).json({ isError: false, data });
  } catch (error) {
    res.status(400).json({ isError: true, error });
  }
});
app.get("/api/courses", async (req, res) => {
  try {
    const data = await courses.findAll();
    res.status(200).json({ isError: false, data });
  } catch (error) {
    res.status(400).json({ isError: true, error });
  }
});

//Never trust your users
// C=> create

app.post("/api/students", async (req, res) => {
  try {
    const { name, email, age, courseId } = req.body;
    const data = await students.create(req.body);
    res.status(200).json({ isError: false, data });
  } catch (error) {
    res.status(400).json({ isError: true, error });
  }
});

app.post("/api/courses", async (req, res) => {
  try {
    const { name } = req.body;
    const data = await courses.create({name});
    res.status(200).json({ isError: false, data });
  } catch (error) {
    res.status(400).json({ isError: true, error });
  }
});


app.put("/api/courses/:id", async (req, res) => {
  try {
    const id=req.params.id;
    const { name } = req.body;
    const data = await courses.upsert({
        id:
    })
    res.status(200).json({ isError: false, data });
  } catch (error) {
    res.status(400).json({ isError: true, error });
  }
});

sequelize
  .sync()
  .then((result) => {
    app.listen(4000, () => {
      console.log("sevrer is started");
    });
  })
  .catch((err) => {
    console.log(err);
  });
