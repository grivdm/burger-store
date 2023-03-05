const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const createError = require("http-errors");
require("express-async-errors");

// create a passport local strategy to authenticate users
passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, next) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return next(createError(400, "Invalid email or password"));
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return next(createError(400, "Invalid email or password"));
        } else {
          return next(null, user);
        }
      } catch (err) {
        next(err);
      }
    }
  )
);

// serialize and deserialize users
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  await User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
