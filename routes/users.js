var express = require('express');
var router = express.Router();

/* Show a listing of basic user information, for use in an index or /users/ style page */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
