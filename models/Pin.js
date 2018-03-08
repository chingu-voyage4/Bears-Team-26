let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let User = require('./User')
let pinSchema = new Schema({

    likes: [User.schema],
    shares: [User.schema],
    title: String,
    imageURL: String,
    description: String,
    comments: String,

  });

var Pin = mongoose.model('Pin', pinSchema);
module.exports = Pin; 