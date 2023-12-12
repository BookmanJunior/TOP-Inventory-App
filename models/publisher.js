const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

publisherSchema.virtual("url").get(function () {
  return `/publishers/${this._id}`;
});

exports.module = mongoose.Model("Publisher", publisherSchema);
