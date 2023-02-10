const User  = require("../models/user");
const _ = require('lodash')
let RegisterController = {}

RegisterController.registerUser = async (req, res, next) => {
    const user = new User({
        id: req.body.id,
        pw: req.body.pw
      });
      console.log(user)
      console.log(req.body)
      user.save((err, user) => {
        console.log
        if (err) return res.status(400).send({ error: "id already in use" });
        else{
            return res.status(200).send({ message: "Successfully registered" });
        }
      });
};

module.exports = RegisterController;