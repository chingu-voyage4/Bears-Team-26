var express = require("express");
var router = express.Router();
let Pin = require("../models/Pin");
let User = require("../models/User");
var path = require("path");
const requestImageSize = require('request-image-size');

router.post("/new", async (req, res, next) => {
  //TODO: Require all fields before the post will work.
  const { title, imageURL, description, postedOn, creator } = req.body;
  const size = await requestImageSize(imageURL);
  const { height, width } = size;
  let options = [];
  if (height > 400 && height/width > 1.25) {
    options.push("card--taller");
  }
  else if (width > 400 && width/height > 1.25) {
    options.push("card--wider");
  }
  else if (width > 800 && height > 800 && width/height < 1.25) {
    options.push("card--wider", "card--taller");
  }

  let newPin = new Pin({
    likes: [],
    shares: [],
    title: title,
    imageURL: imageURL,
    description: description,
    comments: [],
    postedOn: postedOn,
    creator: creator,
    options: options
  });
  //creator: req.user._id
  //No user id on front end yet
  newPin.save((err, result) => {
    /*
    User.findById(req.user._id, (error, user) => {
      user.pins.push(result._id);
      user.save();
      res.json({
        err: err,
        result: result
      });
    });
    */
    if (err) {
      return res.json({ err: err });
    } else {
      res.json({ result: result });
    }
  });
  
  
});

router.delete("/:id", (err, res, next) => {
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
  console.log(req.session);
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

router.post("/:id", function(req, res, next) {
  Pin.findById(req.params.id, (err, result) => {
    if (err) {
      res.json({
        err: err
      });
    } else {
      res.json({
        result: result
      });
    }
  });
});

router.post("/comment/:id", function(req, res, next) {
  Pin.findByIdAndUpdate(
    req.body.id,
    { $push: { comments: req.body.comment } },
    (err, result) => {
      if (err) {
        res.json({
          err: err
        });
      } else {
        res.json({
          message: "Comment added successfully"
        });
      }
    }
  );
});

module.exports = router;
