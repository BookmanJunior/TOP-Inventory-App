const Publisher = require("../models/publisher");
const Game = require("../models/game");
const asyncHandler = require("express-async-handler");

exports.get_publishers = asyncHandler(async (req, res, next) => {
  const publishers = await Publisher.find({}).sort({ name: 1 }).exec();

  res.render("publishers", { publishers });
});

exports.get_publishers_games = asyncHandler(async (req, res, next) => {
  const [publisher, games] = await Promise.all([
    Publisher.findById(req.params.id).exec(),
    Game.find({ publisher: req.params.id }).sort({ name: 1 }).exec(),
  ]);

  res.render("publisher_details", { publisher, games });
});
