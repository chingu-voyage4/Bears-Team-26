let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let findOrCreate = require('mongoose-findorcreate')


let userSchema = new Schema({
    twitterID : String,
    displayName: String,
    profilePic: String,
    following: [String],//An array of id's as strings
    followers: [String],//An array of id's as strings
  });
userSchema.plugin(findOrCreate);
var User = mongoose.model('User', userSchema);
module.exports = User; 