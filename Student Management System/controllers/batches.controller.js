const { students, batches } = require("../models");

const getAllBatches = async (req, res) => {
  try {
    const allBatches = await batches.findAll();
    res.status(200).json({ isError: false, allBatches });
  } catch (error) {
    res.status(404).json({ isError: true, error });
  }
};

const addBatch = async (req, res) => {
  try {
    const newBatch = await batches.create(req.body);
    res.status(200).json({ isError: false, newBatch });
  } catch (error) {
    res.status(404).json({ isError: true, error });
  }
};

const updateBatch = async (req, res) => {
  const id = req.params.id;
  if (!id)
    return res
      .status(404)
      .json({ isError: true, error: "id is required as a param" });

  try {
    await batches.upsert({ id, ...req.body });
    res.status(200).json({ isError: false, msg: "Batch is updated" });
  } catch (error) {
    res.status(404).json({ isError: true, error });
  }
};

const deleteBatch = async (req, res) => {
  const id = req.params.id;
  if (!id)
    return res
      .status(404)
      .json({ isError: true, error: "id is required as a param" });

  try {
    await batches.destroy({ where: { id } });
    await students.destroy({ where: { batchId: id } });
    res
      .status(200)
      .json({
        isError: false,
        msg: "Batch and all the students that belongs to it are deleted",
      });
  } catch (error) {
    res.status(404).json({ isError: true, error });
  }
};

module.exports = { getAllBatches, addBatch, updateBatch, deleteBatch };
