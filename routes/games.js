const express = require("express");
const router = express.Router();
const gameController = require("../controller/gameController");

router.get("/", gameController.getGames);

router.get("/:id", gameController.getGame);

router.get("/game/create", gameController.game_form_get);

router.post("/game/create", gameController.game_form);

router.get("/:id/edit", gameController.game_form_edit_get);

module.exports = router;
