const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  email: {type: String, unique: true, lowercase: true, required: true},
  username: {type: String, unique: true, required: true},
  photo: { type: String , trim: true},
  password: String,
  profile: {
    banner: String,
    intro: {type: String,  max: 400},
    following: [{
      username: String
    }],
    followers: [{
      username: String
    }],
    favorite: [{
      post:{type:Schema.Types.ObjectId,ref:'Post'}
    }],
    posts:[{
      post:{type:Schema.Types.ObjectId,ref:'Post'}
    }],  
  }
}) 

module.exports = mongoose.model('User', UserSchema)