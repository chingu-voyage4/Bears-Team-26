let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let User = require('./User')
let pinSchema = new Schema({

    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],//Only store the ID of the liked and shared users.
    shares: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    title: String,
    imageURL: String,
    description: String,
    comments: String,
    creator: [{ type: Schema.Types.ObjectId, ref: 'User' }],

  });


var Pin = mongoose.model('Pin', pinSchema);
module.exports = Pin; 