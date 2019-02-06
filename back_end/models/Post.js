const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema ({
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  caption: {type: String,  required: true, max: 144},
  image: {type: String},
  likes: [
    {type: Schema.Types.ObjectId, ref: 'User'}
  ],
  comments: [
    {type: Schema.Types.ObjectId, ref: 'Comment'}
  ],
  date: { type: Date, default: Date.now}
}) 


module.exports = mongoose.model('Post', PostSchema)