var express = require('express');
var router = express.Router();
let User = require('../models/User');
var app = express();
var path = require('path');
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  var build =  path.join(__dirname, '../client/dist/', 'index.html');
  res.sendFile(build);
});

module.exports = router;
