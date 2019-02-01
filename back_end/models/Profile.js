const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema ({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  username: {type: String, required:true},
  avatar: {type: String, required:true},
  email:{type: String, required:true},
  intro: {type: String, required:true,  max: 400},
  banner: {type: String},
  following: {
    type: [{type: Schema.Types.ObjectId, ref: 'User'}]
  },
  followers: {
    type: [{type: Schema.Types.ObjectId, ref: 'User'}]
  },
  favorite: {
    type: [{type:Schema.Types.ObjectId,ref:'Post'}]
  },
  posts: {
    type: [{type: Schema.Types.ObjectId, ref: 'Post'}]
  }
}) 

module.exports = mongoose.model('Profile', ProfileSchema)