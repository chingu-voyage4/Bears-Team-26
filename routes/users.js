var express = require('express');
var router = express.Router();
let User = require('../models/User');

router.get('/:id', function(req, res, next) {
  //Return a user's information
  User.findById(req.params.id, (err, result) => {
    res.json({
      err: err,
      result: result
    });
  })
});

module.exports = router;
