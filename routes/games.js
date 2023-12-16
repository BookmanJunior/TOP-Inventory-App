const express = require("express");
const router = express.Router();
const gameController = require("../controller/gameController");

router.get("/", gameController.getGames);

router.get("/:id", gameController.getGame);

router.get("/game/create", gameController.game_form_get);

router.post("/game/create", gameController.game_form);

module.exports = router;
