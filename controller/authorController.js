const Author = require("../models/author");
const Game = require("../models/game");
const asyncHandler = require("express-async-handler");

exports.get_authors = asyncHandler(async (req, res, next) => {
  const authors = await Author.find().sort({ name: 1 }).exec();

  res.render("authors", { authors });
});

exports.get_authors_games = asyncHandler(async (req, res, next) => {
  const [author, games] = await Promise.all([
    Author.findById(req.params.id),
    Game.find({ author: req.params.id }).sort({ title: 1 }).exec(),
  ]);

  res.render("author_details", { author, games });
});
