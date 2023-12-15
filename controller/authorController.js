const Author = require("../models/author");
const Game = require("../models/game");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.get_authors = asyncHandler(async (req, res, next) => {
  const authors = await Author.find().sort({ name: 1 }).exec();

  res.render("authors", { authors });
});

exports.get_authors_games = asyncHandler(async (req, res, next) => {
  const [author, games] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Game.find({ author: req.params.id }).sort({ title: 1 }).exec(),
  ]);

  res.render("author_details", { author, games });
});

exports.author_create_get = asyncHandler(async (req, res, next) => {
  res.render("author_form", { title: "Create Author" });
});

exports.author_create = [
  body("author_name", "Enter author name").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const author = new Author({ name: req.body.author_name });

    if (!errors.isEmpty()) {
      res.render("author_form", {
        title: "Create Author",
        author,
        errors: errors.array(),
      });
    } else {
      const authorExists = await Author.findOne({
        name: req.body.author_name,
      })
        .collation({
          locale: "en",
          strength: 2,
        })
        .exec();

      if (authorExists) {
        res.redirect(authorExists.url);
      } else {
        await author.save();
        res.redirect("/authors");
      }
    }
  }),
];
