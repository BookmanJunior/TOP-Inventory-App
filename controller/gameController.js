const asyncHandler = require("express-async-handler");
const Game = require("../models/game");
const Author = require("../models/author");
const Publisher = require("../models/publisher");
const Genre = require("../models/genre");
const { body, validationResult } = require("express-validator");

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

exports.game_form_get = asyncHandler(async (req, res, next) => {
  const [genres, authors, publishers] = await Promise.all([
    Genre.find().sort({ name: 1 }).exec(),
    Author.find().sort({ name: 1 }).exec(),
    Publisher.find().sort({ name: 1 }).exec(),
  ]);

  res.render("game_form", {
    title: "Create Game",
    genres,
    authors,
    publishers,
  });
});

exports.game_form_post = [
  asyncHandler(async (req, res, next) => {
    //make sure genres and publishers is an array
    if (!Array.isArray(req.body.genres)) {
      req.body.genres = req.body.genres === undefined ? [] : [req.body.genres];
    }

    if (!Array.isArray(req.body.publisher)) {
      req.body.publisher =
        req.body.publisher === undefined ? [] : [req.body.publisher];
    }

    req.body.game_price = Number.parseFloat(req.body.game_price);

    next();
  }),

  body("game_title", "Game title can't be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("game_description", "Game Description must be longer than 10 words.")
    .trim()
    .isLength({ min: 10 })
    .escape(),
  body("game_price", "Game Price can't be empty.")
    .trim()
    .isLength({ min: 1 })
    .isDecimal()
    .withMessage("Game Price must be decimal.")
    .escape(),
  body("genres", "Choose at least one genre.")
    .trim()
    .isArray({ min: 1 })
    .escape(),
  body("author", "Please specify author of the game.").trim().escape(),
  body("publisher", "Choose at least on publisher.")
    .trim()
    .isArray({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const error = validationResult(req);

    const game = new Game({
      title: req.body.game_title,
      author: req.body.author,
      publisher: req.body.publisher,
      genres: req.body.genres,
      price: req.body.game_price,
      description: req.body.game_description,
    });

    if (!error.isEmpty()) {
      const [genres, authors, publishers] = await Promise.all([
        Genre.find().sort({ name: 1 }).exec(),
        Author.find().sort({ name: 1 }).exec(),
        Publisher.find().sort({ name: 1 }).exec(),
      ]);

      for (const genre of genres) {
        if (game.genres.includes(genre._id)) {
          genre.checked = true;
        }
      }

      for (const publisher of publishers) {
        if (game.publisher.includes(publisher._id)) {
          publisher.checked = true;
        }
      }

      res.render("game_form", {
        title: "Create Game",
        errors: error.array(),
        game,
        genres,
        authors,
        publishers,
      });
    } else {
      console.log(game);
      await game.save();
      res.redirect("/games");
    }
  }),
];

exports.game_update_get = asyncHandler(async (req, res, next) => {
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

  const [genres, authors, publishers] = await Promise.all([
    Genre.find().sort({ name: 1 }).exec(),
    Author.find().sort({ name: 1 }).exec(),
    Publisher.find().sort({ name: 1 }).exec(),
  ]);

  genres.map((genre) =>
    game.genres.find((selectedGenre) => {
      if (selectedGenre._id.equals(genre._id)) {
        genre.checked = true;
      }
    })
  );

  publishers.map((publisher) =>
    game.publisher.find((selectedPublisher) => {
      if (selectedPublisher._id.equals(publisher._id)) {
        publisher.checked = true;
      }
    })
  );

  res.render("game_form", {
    title: `Edit ${game.title}`,
    game,
    genres,
    authors,
    publishers,
  });
});

exports.game_update_post = [
  asyncHandler(async (req, res, next) => {
    //make sure genres and publishers is an array
    if (!Array.isArray(req.body.genres)) {
      req.body.genres = req.body.genres === undefined ? [] : [req.body.genres];
    }

    if (!Array.isArray(req.body.publisher)) {
      req.body.publisher =
        req.body.publisher === undefined ? [] : [req.body.genres];
    }

    req.body.game_price = Number.parseFloat(req.body.game_price);

    next();
  }),

  body("game_title", "Game title can't be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("game_description", "Game Description must be longer than 10 words.")
    .trim()
    .isLength({ min: 10 })
    .escape(),
  body("game_price", "Game Price can't be empty.")
    .trim()
    .isLength({ min: 1 })
    .isDecimal()
    .withMessage("Game Price must be decimal.")
    .escape(),
  body("genres", "Choose at least one genre.")
    .trim()
    .isArray({ min: 1 })
    .escape(),
  body("author", "Please specify author of the game.").trim().escape(),
  body("publisher", "Choose at least on publisher.")
    .trim()
    .isArray({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const error = validationResult(req);

    const game = new Game({
      title: req.body.game_title,
      author: req.body.author,
      publisher: req.body.publisher,
      genres: req.body.genres,
      price: req.body.game_price,
      description: req.body.game_description,
      _id: req.params.id, //required or a new id will be assigned
    });

    if (!error.isEmpty()) {
      const [genres, authors, publishers] = await Promise.all([
        Genre.find().sort({ name: 1 }).exec(),
        Author.find().sort({ name: 1 }).exec(),
        Publisher.find().sort({ name: 1 }).exec(),
      ]);

      for (const genre of genres) {
        if (game.genres.includes(genre._id)) {
          genre.checked = true;
        }
      }

      for (const publisher of publishers) {
        if (game.publisher.includes(publisher._id)) {
          publisher.checked = true;
        }
      }

      res.render("game_form", {
        title: "Create Game",
        errors: error.array(),
        game,
        genres,
        authors,
        publishers,
      });
    } else {
      await Game.findByIdAndUpdate(req.params.id, game);
      res.redirect(game.url);
    }
  }),
];

exports.game_delete_post = asyncHandler(async (req, res, next) => {
  const game = await Game.findById(req.params.id).exec();

  if (game === null) {
    res.redirect("/games");
  } else {
    await game.deleteOne();
    res.redirect("/games");
  }
});
