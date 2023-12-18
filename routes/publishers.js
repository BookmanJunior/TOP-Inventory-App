const express = require("express");
const router = express.Router();
const publisherController = require("../controller/publisherController");

router.get("/", publisherController.get_publishers);

router.get("/:id", publisherController.get_publishers_games);

router.get("/publisher/create", publisherController.publisher_create_get);

router.post("/publisher/create", publisherController.publisher_create);

router.get("/:id/update", publisherController.publisher_update_get);

router.post("/:id/update", publisherController.publisher_update_post);

module.exports = router;
