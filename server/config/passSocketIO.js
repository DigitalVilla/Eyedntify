const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('mongoose').model('User');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = io => {
  io.use(authorize(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (!user) return done(null, false);
        return done(null, user); //success
      })
      .catch(err => console.log(err));
  }));
};


const authorize = (options, verify) => {
  const strategy = new JwtStrategy(options, verify)
  return function authorize(socket, accept) {
    // --- Begin strategy augmentation ala passport
    strategy.success = function success(user) {
      console.log(user);
      socket.handshake.user = user
      accept()
    }
    strategy.fail = info => accept(new Error(info))
    strategy.error = error => accept(error)
    // --- End strategy augmentation
    strategy.authenticate(socket.request, {})
  }
}