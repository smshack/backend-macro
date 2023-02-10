const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  pw: { type: String, required: true },
  nvuserlist: { type: Array, required: true },
},{ timestamps: true });

userSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified("pw")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.pw, salt, (err, hash) => {
      if (err) return next(err);
      user.pw = hash;
      next();
    });
  });
});

userSchema.methods.comparepw = function(candidatepw) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatepw, this.pw, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;