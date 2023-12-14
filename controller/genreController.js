const Genre = require("../models/genre");
const Game = require("../models/game");
const asyncHandler = require("express-async-handler");

exports.get_genres = asyncHandler(async (req, res, next) => {
  const genres = await Genre.find().sort({ name: 1 }).exec();

  res.render("genres", { genres });
});

exports.get_genres_games = asyncHandler(async (req, res, next) => {
  const [genre, games] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Game.find({ genres: req.params.id }).sort({ title: 1 }).exec(),
  ]);

  res.render("genre_details", { genre, games });
});
