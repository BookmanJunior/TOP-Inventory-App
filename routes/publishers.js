const express = require("express");
const router = express.Router();
const publisherController = require("../controller/publisherController");

router.get("/", publisherController.get_publishers);

router.get("/:id", publisherController.get_publishers_games);

module.exports = router;
