const Genre = require("../models/genre");
const Game = require("../models/game");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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

exports.genre_create_get = asyncHandler(async (req, res, next) => {
  res.render("genre_form", { title: "Create Genre" });
});

exports.genre_create = [
  body("genre_name", "Enter genre name").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const genre = new Genre({ name: req.body.genre_name });

    if (!errors.isEmpty()) {
      res.render("genre_form", {
        title: "Create Genre",
        genre,
        errors: errors.array(),
      });
    } else {
      const genreExists = await Genre.findOne({
        name: req.body.genre_name,
      })
        .collation({
          locale: "en",
          strength: 2,
        })
        .exec();

      if (genreExists) {
        res.redirect(genreExists.url);
      } else {
        await author.save();
        res.redirect("/authors");
      }
    }
  }),
];

exports.genre_update_get = asyncHandler(async (req, res, next) => {
  const genre = await Genre.findById(req.params.id).exec();

  if (genre === null) {
    const error = new Error("Genre not found.");
    error.status = 404;
    return next(error);
  }

  res.render("genre_form", { title: "Update Genre", genre });
});

exports.genre_update_post = [
  body("genre_name", "Genre field can't be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const error = validationResult(req);

    const genre = new Genre({
      name: req.body.genre_name,
      _id: req.params.id,
    });

    if (!error.isEmpty()) {
      res.render("genre_form", {
        title: "Update Genre",
        genre,
        errors: error.array(),
      });
    } else {
      await Genre.findByIdAndUpdate(req.params.id, genre, {});
      res.redirect(genre.url);
    }
  }),
];
