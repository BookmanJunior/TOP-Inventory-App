var express = require("express");
var router = express.Router();
const gameController = require("../controller/gameController");

/* GET home page. */
router.get("/", gameController.index);

module.exports = router;
