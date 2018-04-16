var express = require('express');
var router = express.Router();
let User = require('../models/User');
let Board = require('../models/Board')
/* GET ALL Public Boards */
router.get('/', function (req, res, next) {
  Board.find({
    privacy: false
  }, (err, result) => {
    if (err | !result) {
      res.json(500, "Unable to list boards")
    } else {
      res.json(result);
    }
  })
});

router.post('/', (req, res) => {
  //Description: Create a Board
  let title = req.body.title;
  let creator = String(req.user._id);
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

router.post("/new", (req, res) => {
  //Description: Create a Board
  const {
    title,
    userID,
    description,
    image,
    name,
    privacy
  } = req.body;

  Board.createNew(
    title,
    userID, // creator
    description,
    image,
    name,
    privacy,
    (err, result) => {
      res.json({
        err: err,
        result: result
      });

      User.findByIdAndUpdate(userID, {
        $push: {
          boards: result._id
        }
      },
      (err, user) => {
        if (err) {
          console.log(err);
        }
      });
    }
  );

});

router.delete('/:id', (req, res) => {
  //Delete a Board
  let idToDelete = req.params.id;
  Board.findByIdAndRemove(idToDelete, (err, deletedDocument) => {
    res.json({
      err: err,
      deletedDocument: deletedDocument
    })
  })
})

router.patch('/:id', (req, res) => {
  //Update a Board
  let idToChange = req.params.id;
  Board.findByIdAndUpdate(idToChange, (err, changedDocument) => {

    //TODO: Finish implementing.
    res.json({
      err: err,
      changedDocument: changedDocument
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
});

router.post("/latest", async (req, res) => {
  try {
    const id = "5ad3a5490bda17317d58fffc";
    let found = await Board.findById(id).exec();
    if (!found) {
      res.json({
        err: "Could not find Latest Board"
      });
    } else {
      Board.findByIdAndUpdate(
        id, {
          $push: {
            pins: req.body.newPin
          }
        },
        (err, result) => {
          res.json({
            err: err,
            result: result
          });
        }
      );
    }
  } catch (err) {
    console.log(err);
    res.json({ err: err });
  }

});

router.post("/latestInfo", async (req, res) => {
  try {
    Board.findById("5ad3a5490bda17317d58fffc", (err, result) => {
      if (err) {
        res.json({
          err: err
        });
      } else {
        res.json({
          result: [...result.pins].reverse().slice(0, 100)
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.json({ err: err });
  }
});

module.exports = router;