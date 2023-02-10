const User  = require("../models/user");
const _ = require('lodash')
const jwt = require("jsonwebtoken");
let LoginController = {}

LoginController.loginUser = async (req, res, next) => {
    console.log(req.body,'req.body')
    const user = await User.findOne({ id: req.body.id })
    if (!user) return res.status(400).send({ error: "id or password is incorrect" });
    let resultisMatch =false
    await user.comparepw(req.body.pw, (err, isMatch) => {
        // ismatch가 true면 로그인 성공
        if (!isMatch) return res.status(400).send({ error: "id or password is incorrect" });
    })
    console.log('process.env.JWT_SECRET')
    console.log(process.env.JWT_SECRET)
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { expire: new Date() + 9999 });
    return res.status(200).json({message: "Successfully logged in",accesstoken: token,data: user})
};

module.exports = LoginController;
