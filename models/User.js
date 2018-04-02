let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let findOrCreate = require('mongoose-findorcreate')
let Pin = require('./Pin');

let userSchema = new Schema({
    twitterID : String,
    displayName: String,
    profilePic: String,
    boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followed_boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
    pins: [{ type: Schema.Types.ObjectId, ref: 'Pin' }],
  });
userSchema.plugin(findOrCreate);
var User = mongoose.model('User', userSchema);
module.exports = User; 
