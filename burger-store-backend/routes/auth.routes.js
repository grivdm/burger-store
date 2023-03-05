const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

// POST login
router.post("/login", passport.authenticate("local", { failureRedirect: '/login' }), (req, res) => {
    res.sendStatus(200);
});




// GET user
router.get("/user", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
});



// GET logout
router.get("/logout", (req, res) => {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
