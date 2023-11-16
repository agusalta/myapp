var express = require("express");
var router = express.Router();

const usersController = require("../controllers/usersController");

router.post("/register", usersController.register);
router.post("/login", usersController.login);

module.exports = router;
