const asyncHandler = require("express-async-handler");
const Game = require("../models/game");
const Author = require("../models/author");
const Publisher = require("../models/publisher");
const Genre = require("../models/genre");

exports.index = asyncHandler(async (req, res, next) => {
  const [gameCount, authorCount, publisherCount, genreCount] =
    await Promise.all([
      Game.countDocuments().exec(),
      Author.countDocuments().exec(),
      Publisher.countDocuments().exec(),
      Genre.countDocuments().exec(),
    ]);

  res.render("index", {
    items: {
      gameCount,
      authorCount,
      publisherCount,
      genreCount,
    },
    title: "Game Catalog",
  });
});

exports.getGames = asyncHandler(async (req, res, next) => {
  const games = await Game.find({}).sort({ title: 1 }).exec();

  res.render("games", { games });
});

exports.getGame = asyncHandler(async (req, res, next) => {
  const game = await Game.findById(req.params.id)
    .populate("genres")
    .populate("author")
    .populate("publisher")
    .exec();

  if (game === null) {
    const err = new Error("Game not found");
    err.status = 404;
    return next(err);
  }

  res.render("game_details", { game });
});
