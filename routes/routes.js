const express = require("express");

const router = express.Router();

const RegisterRouter = require('./register');
const LoginRouter = require('./login');
const UserRouter = require('./user');

router.use("/register", RegisterRouter);
router.use("/login", LoginRouter);
router.use("/user", UserRouter);

module.exports = router;