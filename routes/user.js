const express = require("express");

const router = express.Router();
const UserController = require("../controller/user");

router.get("/", UserController.confirmUser);


module.exports = router;