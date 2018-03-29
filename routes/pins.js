var express = require("express");
var router = express.Router();
let Pin = require("../models/Pin");
var path = require("path");

router.post("/", (req, res) => {
  //TODO: Require all fields before the post will work.
  let title = req.body.title ? req.body.title : "none";
  let imageURL = req.body.imageURL;
  let description = req.body.description;
  let newPin = new Pin({
    likes: [],
    shares: [],
    title: title,
    imageURL: imageURL,
    description: description
  });
  newPin.save((err, result) => {
    res.json({
      err: err,
      result: result
    });
  });
});
router.delete("/:id", (err, res) => {
  //TODO: Ensure that a user has permission to delete this pin.
  Pin.findByIdAndRemove(req.params.id, (err, result) => {
    res.json({
      err: err,
      result: result
    });
  });
});

router.patch("/:id", function(req, res, next) {
  //TODO: Implement
});

router.get("/:id", function(req, res, next) {
  //Return a pin's information
  //I'm commenting this out because it isn't triggered when someone clicks
  //a link in react, only when a user refreshes their page.
  /*
  Pin.findById(req.params.id, (err, result) => {
    res.json({
      err: err,
      result: result
    });
  });
  */
  const build = path.join(__dirname, "../client/dist/", "index.html");
  res.sendFile(build);
});

module.exports = router;
