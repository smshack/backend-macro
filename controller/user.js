const { UserAuthority } = require("../models/auth");
const _ = require('lodash')
let UserController = {}


UserController.loginUser = async (req, res, next) => {
  const { id,pw } = req.body;
  try {
    const result = await UserAuthority.findOne(req.body);

    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ path: "UserController.loginUser Error", error });
  }
};

module.exports = UserController;