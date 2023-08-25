const User = require("../models/User");

const authmiddleware =async (req, res, next) => {
  // Find the user by id
  User.findById(req.session.userId, (error, user) => {
      if (error || !user) {
          res.redirect("/");
      }
     next();
  });


};

module.exports = { authmiddleware };
