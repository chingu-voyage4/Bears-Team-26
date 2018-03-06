let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let findOrCreate = require('mongoose-findorcreate')
let Pin = require('./Pin');

let userSchema = new Schema({
    twitterID : String,
    displayName: String,
    profilePic: String,
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],//An array of id's as strings
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],//An array of id's as strings
    followed_boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
    pins: [Pin.schema],
  });
userSchema.plugin(findOrCreate);
var User = mongoose.model('User', userSchema);
module.exports = User; 