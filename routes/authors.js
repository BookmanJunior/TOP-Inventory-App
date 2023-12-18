const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController");

router.get("/", authorController.get_authors);

router.get("/:id", authorController.get_authors_games);

router.get("/author/create", authorController.author_create_get);

router.post("/author/create", authorController.author_create);

router.get("/:id/update", authorController.author_update_get);

router.post("/:id/update", authorController.author_update_post);

module.exports = router;
