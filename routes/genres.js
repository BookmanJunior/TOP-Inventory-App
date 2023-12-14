const express = require("express");
const router = express.Router();
const genreController = require("../controller/genreController");

router.get("/", genreController.get_genres);

router.get("/:id", genreController.get_genres_games);

module.exports = router;
