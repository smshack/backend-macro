const express = require("express");

const router = express.Router();
const LoginController = require("../controller/login");

router.post("/", LoginController.loginUser);


module.exports = router;
