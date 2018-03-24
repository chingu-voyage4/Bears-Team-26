var express = require('express');
var router = express.Router();
let User = require('../models/User');
let Board = require('../models/Board')
/* GET ALL Public Boards */
router.get('/', function(req, res, next) {
  Board.find({privacy: false}, (err, result) => {
    if (err | !result){
      res.json(500, "Unable to list boards")
    }
    else {
      res.json(result);
    }
  })
});

router.post('/', (req, res) => {
  //Description: Create a Board
    let title = req.body.title;
    let creator = String(req.user._id);
    console.log(creator);
    let description = req.body.description;
    let image = req.body.image;
    let name = req.body.name;
    let privacy = Boolean(req.body.privacy);
    Board.createNew(title, creator, description, image, name, privacy, (err, result) => {
      res.json({
        err: err,
        result: result
      })
    });
});

router.delete('/:id', (req, res) => {
  //Delete a Board
  let idToDelete = req.params.id;
  Board.findByIdAndRemove(idToDelete , (err, deletedDocument) => {
      res.json({
        err: err, 
        deletedDocument: deletedDocument
      })
  })
})

router.patch('/:id', (req, res) => {
  //Delete a Board
  let idToChange = req.params.id;
  Board.findByIdAndUpdate(idToChange , (err, deletedDocument) => {

    //TODO: Finish implementing.
      res.json({
        err: err, 
        deletedDocument: deletedDocument
      })
  })
})


router.get('/:id', (req, res) => {
  //Retrieve information about a Board
  let idToFind = req.params.id;
  Board.findById(idToFind, (err, result) => {
    res.json({
      err: err, 
      result: result
    })
  })
})

router.get('/:id/pins', (req, res) => {
  //Retrieve the Pins on a Board
  let idToFind = req.params.id;
  Board.findById(idToFind, (err, result) => {
    res.json({
      err: err,
      result: result.pins
    })
  })
})
module.exports = router;
