const express = require("express");
const router = express.Router();
const genreController = require("../controller/genreController");

router.get("/", genreController.get_genres);

router.get("/:id", genreController.get_genres_games);

router.get("/genre/create", genreController.genre_create_get);

router.post("/genre/create", genreController.genre_create);

router.get("/:id/update", genreController.genre_update_get);

router.post("/:id/update", genreController.genre_update_post);

module.exports = router;
