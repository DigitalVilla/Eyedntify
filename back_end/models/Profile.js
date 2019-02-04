const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema ({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  intro: {type: String, max: 300},
  handler: {type: String},
  banner: {type: String},
  following: [{type: Schema.Types.ObjectId, ref: 'User'}],
  followers:  [{type: Schema.Types.ObjectId, ref: 'User'}],
  favorite: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
}) 

module.exports = mongoose.model('Profile', ProfileSchema)