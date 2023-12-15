const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController");

router.get("/", authorController.get_authors);

router.get("/:id", authorController.get_authors_games);

router.get("/author/create", authorController.author_create_get);

router.post("/author/create", authorController.author_create);

module.exports = router;
