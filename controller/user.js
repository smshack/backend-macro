const User  = require("../models/user");
const _ = require('lodash')
let UserController = {}
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
UserController.confirmUser = async (req, res, next) => {
  const { accesstoken } = req.headers;
  try {
    if (accesstoken == null) {
      res.status(403).json({success:false, errormessage:'토큰이 없습니다'});
    }else{
      const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
      const user = await User.findOne({ _id: decoded._id });
      if (!user) {
        res.status(403).json({success:false, errormessage:'유저가 없습니다'});
      }else{
        res.status(200).json({success:true, data: user});
      }
    }
  } catch (error) {
    res.status(400).json({ path: "UserController.loginUser Error", error });
  }
};



module.exports = UserController;