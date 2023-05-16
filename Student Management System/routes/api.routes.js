const express = require("express");
const {
  addBatch,
  getAllBatches,
  updateBatch,
  deleteBatch,
} = require("../controllers/batches.controller");
const {
  getStudents,
  addStudents,
  updateStudent,
} = require("../controllers/student.controller");

const apiRouter = express.Router();

//BATCHES ROUTES

apiRouter.get("/batches", getAllBatches);

apiRouter.post("/batches", addBatch);

apiRouter.put("/batches/:id", updateBatch);

apiRouter.delete("/batches/:id", deleteBatch);

//STUDENTS ROUTES

apiRouter.get("/students", getStudents);

apiRouter.post("/students", addStudents);

apiRouter.put("/students", updateStudent);

apiRouter.delete("/students", deleteBatch);

module.exports = { apiRouter };
