const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  email: {type: String, unique: true, lowercase: true, required: true},
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  avatar: {type: String}
});

module.exports = mongoose.model('User', UserSchema)