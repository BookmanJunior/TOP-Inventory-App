const mongoose = require("mongoose");
const { Schema } = mongoose;
const Author = require("./author");
const Publisher = require("./publisher");
const Genre = require("./genre");

const gameSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: Author, required: true },
  publisher: [{ type: Schema.Types.ObjectId, ref: Publisher, required: true }],
  genres: [{ type: Schema.Types.ObjectId, ref: Genre, required: true }],
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

gameSchema.virtual("url").get(function () {
  return `/games/${this._id}`;
});

module.exports = mongoose.model("Game", gameSchema);
