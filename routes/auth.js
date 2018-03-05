var express = require('express');
var router = express.Router();
let passport = require('passport');
let session = require('express-session');

// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
router.get('/twitter', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/twitter/callback',
    passport.authenticate('twitter', 
    { successRedirect: '/',
    failureRedirect: '/login' }));

module.exports = router;
