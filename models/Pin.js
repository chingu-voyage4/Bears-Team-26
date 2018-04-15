let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let User = require("./User");
let pinSchema = new Schema({
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }], //Only store the ID of the liked and shared users.
  shares: [{ type: Schema.Types.ObjectId, ref: "User" }],
  title: String,
  imageURL: String,
  description: String,
  comments: [
    {
      commenterName: String,
      commentText: String,
      postedOn: String,
      profilePic: String
    }
  ],
  creator: String,
  postedOn: String,
  options: [String]
});

var Pin = mongoose.model("Pin", pinSchema);
module.exports = Pin;
