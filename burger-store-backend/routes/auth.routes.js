const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const createError = require("http-errors");
require("express-async-errors");
const roleHandler = require("../middlewares/roleHandler");
const authenticationHandler = require("../middlewares/authenticationHandler");

// POST login
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.sendStatus(200);
  }
);

// GET user
router.get("/user", authenticationHandler.isAuthenticated, (req, res, next) => {
  res.json(req.user);
});

// GET admin
router.get("/admin", roleHandler.ensureAdmin, (req, res, next) => {
  res.sendStatus(200);
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
