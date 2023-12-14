const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController");

router.get("/", authorController.get_authors);

router.get("/:id", authorController.get_authors_games);

module.exports = router;
