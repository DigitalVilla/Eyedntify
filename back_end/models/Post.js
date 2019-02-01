const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema ({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  caption: {type: String,  required: true, max: 144},
  image: {type: String, required: true},
  likes: [
    {type: Schema.Types.ObjectId, ref: 'User'}
  ],
  comments: [{
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    comment: {type: String, required: true, max: 144}
  }]
}) 

module.exports = mongoose.model('Post', PostSchema)