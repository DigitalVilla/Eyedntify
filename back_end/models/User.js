const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  email: {type: String, unique: true, lowercase: true, required: true},
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  avatar: {type: String}
});

UserSchema.methods.gravatar = function(size) {
  // '&d=robohash':
  const style = '&d=retro';
  if (!size) size = 200;
  var md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + style;
};


UserSchema.methods.bcrypt = function (password, res) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
    if (err) throw err;
    this.password = hash;
    this.save()
      .then(user => res.json(user))
      .catch(err => console.log(err));
    });
  });
}




module.exports = mongoose.model('User', UserSchema)