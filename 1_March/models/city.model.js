const mongoose = require("mongoose");

const citySchema = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  previous_search: [{ type: String, required: true }],
});

const userCitiesList = mongoose.model("citie", citySchema);

module.exports = { userCitiesList };
