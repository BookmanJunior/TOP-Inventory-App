const express = require("express");
const router = express.Router();
const gameController = require("../controller/gameController");

router.get("/", gameController.getGames);

router.get("/:id", gameController.getGame);

module.exports = router;
