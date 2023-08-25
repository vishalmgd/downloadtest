const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
UserSchema.pre("save", function (next) {
    const user = this;
    bcryptjs.hash(user.password, 10, (error, encrypted) => {
      if (error) return next(error);
      user.password = encrypted;
      next();
    });
  });
  

module.exports = mongoose.model("User", UserSchema);