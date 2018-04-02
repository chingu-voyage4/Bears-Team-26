var express = require("express");
var router = express.Router();
let passport = require("passport");
let session = require("express-session");

// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
router.get("/twitter", passport.authenticate("twitter"));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: "/login"
  }),
  (req, res, next) => {
    //console.log(req.user);
    //console.log(req.query);
    res.redirect("/");
  }
);

router.get("/check/:id", (req, res, next) => {
  console.log("Session", req.session);
  const { _id } = req.session.passport.user;
  if (_id) {
    res.json({
      isAuthenticated: true
    });
  } else {
    res.json({
      isAuthenticated: false
    });
  }
});

module.exports = router;
