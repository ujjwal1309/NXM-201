const { students, batches } = require("../models");

const getStudents = async (req, res) => {
  const { search } = req.query;
  try {
    batches.hasMany(students, { foreignKey: "batchId" });
    students.belongsTo(batches, { foreignKey: "batchId" });

    if (search) {
        const allStudents = await students.findAll({ include: [{model:batches}],where:{name:search} });
      res.status(200).json({ isError: false, allStudents });
    } else {
      const allStudents = await students.findAll({ include: [{model:batches}] });
      res.status(200).json({ isError: false, allStudents });
    }
  } catch (error) {
    res.status(404).json({ isError: true, error });
  }
};

const addStudents = async (req, res) => {
  try {
    const newStudent = await students.create(req.body);
    res.status(200).json({ isError: false, newStudent });
  } catch (error) {
    res.status(404).json({ isError: true, error });
  }
};

const updateStudent = async (req, res) => {
  const id = req.params.id;
  if (!id)
    return res
      .status(404)
      .json({ isError: true, error: "id is required as a param" });
  try {
    await students.upsert({ id, ...req.body });
    res.status(200).json({ isError: false, msg: "Student is updated" });
  } catch (error) {
    res.status(404).json({ isError: true, error });
  }
};

const deleteStudent = async (req, res) => {
  const id = req.params.id;
  if (!id)
    return res
      .status(404)
      .json({ isError: true, error: "id is required as a param" });
  try {
    await students.destroy({ where: { id } });
    res.status(200).json({ isError: false, msg: "Student is deleted" });
  } catch (error) {
    res.status(404).json({ isError: true, error });
  }
};

module.exports = { getStudents, addStudents, updateStudent, deleteStudent };
