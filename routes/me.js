var express = require('express');
var router = express.Router();
let User = require('../models/User');
/* GET home page. */
router.get('/', function(req, res) {
    if(req.isAuthenticated()){
        res.send(req.user);
    }
    else {
        res.status(403).send("You must be logged in to view this page")
    }
});

router.post('/following/users', (req, res) => {
    //Find the current logged in User.
    let user_to_follow = req.body.user_to_follow
    if(req.isAuthenticated()){
        User.findByIdAndUpdate(req.user._id,
        {$push: {following: user_to_follow}}, (err, result) => {
            res.json({
                err: err, 
                result: result,
            })
        } )
    }
    else {
        res.send("You must be logged in to access this function");
    }
})

router.post('/following/boards', (req, res) => {
    //Find the current logged in User.
    let board_to_follow = req.body.board_to_follow
    if(req.isAuthenticated()){
        User.findByIdAndUpdate(req.user._id,
        {$push: {followed_boards: board_to_follow}}, (err, result) => {
            res.json({
                err: err, 
                result: result,
            })
        } )
    }
    else {
        res.send("You must be logged in to access this function");
    }
})


router.post('/followers/', (req, res) => {
    //Find the current logged in User.
    let board_to_follow = req.body.board_to_follow
    if(req.isAuthenticated()){
        User.findById(req.user._id, (error, result) => {
            res.json({error: error, result: result.followers}); //!TODO Populate
        })

    }
    else {
        res.send("You must be logged in to access this function");
    }
})


router.post('/following/boards', (req, res) => {
    //Find the current logged in User.
    let board_to_follow = req.body.board_to_follow
    if(req.isAuthenticated()){
        User.findById(req.user._id, (error, result) => {
            res.json({error: error, result: result.followed_boards}); //!TODO Populate
        })
    }
    else {
        res.send("You must be logged in to access this function");
    }
})


router.post('/following/boards', (req, res) => {
    //Find the current logged in User.
    let board_to_follow = req.body.board_to_follow
    if(req.isAuthenticated()){
        User.findByIdAndUpdate(req.user._id,
        {$push: {followed_boards: board_to_follow}}, (err, result) => {
            res.json({
                err: err, 
                result: result,
            })
        } )
    }
    else {
        res.send("You must be logged in to access this function");
    }
})

module.exports = router;
