const mongoose = require("mongoose");
// 유저 권한 관련
const UserAuthoritySchemma = new mongoose.Schema(
  {
    id: { type: String, required: true },
    pw: { type: String, required: true },
    nvuserlist: { type: Array, required: true },
  },
  { timestamps: true }
);

const UserAuthority = mongoose.model(
  "authentication",
  UserAuthoritySchemma,
  "authentication"
);
module.exports = { UserAuthority };
