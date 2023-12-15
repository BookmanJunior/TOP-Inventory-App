const express = require("express");
const router = express.Router();
const genreController = require("../controller/genreController");

router.get("/", genreController.get_genres);

router.get("/:id", genreController.get_genres_games);

router.get("/genre/create", genreController.genre_create_get);

router.post("/genre/create", genreController.genre_create);

module.exports = router;
