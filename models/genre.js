const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

genreSchema.virtual("url").get(function () {
  return `/genres/${this._id}`;
});

module.exports = mongoose.model("Genre", genreSchema);
