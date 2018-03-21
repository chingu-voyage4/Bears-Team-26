var express = require('express');
var router = express.Router();
let User = require('../models/User');
/* GET home page. */
router.get('/', function(req, res) {
    //Return the logged in user's information
    if(req.isAuthenticated()){
        res.send(req.user);
    }
    else {
        res.status(403).send("You must be logged in to view this page")
    }
});

router.get('/boards', (req, res) => {
    //Get the Boards that the logged in user follows
    let board_to_follow = req.body.board_to_follow
    if(req.isAuthenticated()){
        User.findById(req.user._id, (error, result) => {
            res.json({error: error, result: result.boards}); //!TODO Populate
        });
    }
    else {
        res.send("You must be logged in to access this function");
    }
})


router.get('/boards/suggested', (req, res) => {
    //Description: Return Board suggestions for the logged in user
    //TODO: IMPLEMENT
})


router.get('/followers/', (req, res) => {
    //Return the users that follow the logged in user
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

router.get('/following/boards', (req, res) => {
    //Get the Boards that the logged in user follows
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
    //Follow a Board
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


router.delete('/following/boards/:id', (req, res) => {
    //Unfollow a Board
    let board_to_delete = req.params.id
    if(req.isAuthenticated()){
        User.findByIdAndUpdate(req.user._id,
        {   $pullAll: { followed_boards: [board_to_delete] }}, (err, result) => {
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


router.get('/following/interests', (req, res) => {
    //Description: Return Board suggestions for the logged in user
    //TODO: IMPLEMENT
})

router.get('/following/users', (req, res) => {
    if(req.isAuthenticated()){
        User.findById(req.user._id)
        .populate('following')
        .exec((error, result) => {
            res.json({error: error, result: result}); //!TODO Populate
        });
    }
    else {
        res.send("You must be logged in to access this function");
    }
})

router.post('/following/users', (req, res) => {
    //Follow a user
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



router.delete('/following/user/:id', (req, res) => {
    //Unfollow a user
    let users_to_delete = req.params.id
    if(req.isAuthenticated()){
        User.findByIdAndUpdate(req.user._id,
        {   $pullAll: { following: [user_to_delete] }}, (err, result) => {
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

router.get('/pins/', (req, res) => {
    if(req.isAuthenticated()){
        User.findById(req.user._id, (error, result) => {
            res.json({error: error, result: result.pins}); //!TODO Populate
        })
    }
    else {
        res.send("You must be logged in to access this function");
    }
});

router.post('/search/boards', (req, res) => {
    //TODO Implement
})

router.post('/search/pins', (req, res) => {
    //TODO Implement
})


module.exports = router;
