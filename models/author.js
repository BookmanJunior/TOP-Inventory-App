const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

authorSchema.virtual("url").get(function () {
  return `/authors/${this._id}`;
});

module.exports = mongoose.model("Author", authorSchema);
