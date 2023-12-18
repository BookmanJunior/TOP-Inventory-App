const Publisher = require("../models/publisher");
const Game = require("../models/game");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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

exports.publisher_create_get = asyncHandler(async (req, res, next) => {
  res.render("publisher_form", { title: "Create Publisher" });
});

exports.publisher_create = [
  body("publisher_name", "Enter publisher name")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const publisher = new Publisher({ name: req.body.publisher_name });

    if (!errors.isEmpty()) {
      res.render("publisher_form", {
        title: "Create Publisher",
        publisher,
        errors: errors.array(),
      });
    } else {
      const publisherExists = await Publisher.findOne({
        name: req.body.publisher_name,
      })
        .collation({
          locale: "en",
          strength: 2,
        })
        .exec();

      if (publisherExists) {
        res.redirect(publisherExists.url);
      } else {
        await author.save();
        res.redirect("/authors");
      }
    }
  }),
];

exports.publisher_update_get = asyncHandler(async (req, res, next) => {
  const publisher = await Publisher.findById(req.params.id).exec();

  if (publisher === null) {
    const error = new Error("Publisher not found.");
    error.status = 404;
    return next(error);
  }

  res.render("publisher_form", { title: "Update Publisher", publisher });
});

exports.publisher_update_post = [
  body("publisher_name", "Publisher name can't be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const error = validationResult(req);

    const publisher = new Publisher({
      name: req.body.publisher_name,
      _id: req.params.id,
    });

    if (!error.isEmpty()) {
      res.render("publisher_form", {
        title: "Update Publisher",
        publisher,
        errors: error.array(),
      });
    } else {
      await Publisher.findByIdAndUpdate(req.params.id, publisher, {});
      res.redirect(publisher.url);
    }
  }),
];
