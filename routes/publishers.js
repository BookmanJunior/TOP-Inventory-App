const express = require("express");
const router = express.Router();
const publisherController = require("../controller/publisherController");

router.get("/", publisherController.get_publishers);

router.get("/:id", publisherController.get_publishers_games);

router.get("/publisher/create", publisherController.publisher_create_get);

router.post("/publisher/create", publisherController.publisher_create);

module.exports = router;
