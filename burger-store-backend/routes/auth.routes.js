const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const createError = require("http-errors");
require("express-async-errors");

// POST login
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.sendStatus(200);
  }
);

// GET user
router.get("/user", (req, res, next) => {
  if (req.user) {
    res.json(req.user);
  } else {
    return next(createError(401, "Unauthorized"));
  }
});

// GET logout
router.post("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.sendStatus(200);
      });
});

module.exports = router;
