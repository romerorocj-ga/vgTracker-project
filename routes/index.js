var express = require("express");
var router = express.Router();
const passport = require("passport");

router.get("/", function (req, res, next) {
  res.redirect("/vgames");
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/vgames",
    failureRedirect: "/vgames",
  })
);

router.get("/logout", function (req, res) {
  req.logout(function () {
    res.redirect("/vgames");
  });
});

module.exports = router;
