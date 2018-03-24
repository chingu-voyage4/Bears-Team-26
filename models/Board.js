let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Pin = require('./Pin');
let User = require('./User')
let boardSchema = new Schema({

    title: String,
    pins: [Pin.schema],
    created_at: Date,
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    description: String,
    image: String,
    name: String,
    privacy: Boolean,
    url: String
  });

boardSchema.statics.createNew = function(title, creator, description, image, name, privacy, callback){
    let newBoard = new Board({
        title: title,
        creator: creator,
        created_at: Date.now(),
        pins: [],
        description: description,
        image: image,
        name: name,
        privacy: privacy,
        url: null

    })
    newBoard.save((err, result) => {
        callback(err, result);
    });
}

boardSchema.index({'description': 'text'}); //Create a text index so that $text works. 
var Board = mongoose.model('Board', boardSchema);
module.exports = Board; 