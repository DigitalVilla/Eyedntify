const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const passport = require('passport'); 
const router = express.Router();

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));


// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);
  
  const {email, username, password} = req.body;
  User.findOne({ username }).then(user => {
    if (user) return res.status(400).json('Username already exists');
    User.findOne({ email }).then(user => {
      if (user) return res.status(400).json('Email already exists');
      const newUser = new User();
      newUser.email = email;
      newUser.username = username;
      newUser.avatar = newUser.gravatar();
      newUser.bcrypt(password, res);
    })
  })
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid, isEmail } = validateLoginInput(req.body);
  if (!isValid)  return res.status(400).json(errors);
  
  const {login, password} = req.body;
  const search = isEmail ? { email:login } : { username:login };

  User.findOne(search).then(user => {
    if (!user) return res.status(404).json({login: 'User not found'});
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({password: 'Password is invalid'});
        // Create JWT Payload & // Sign Token
        const payload = { id: user.id, username: user.username, avatar: user.avatar }; 
        console.log(payload);
        
        jwt.sign(payload, keys.secret,{ expiresIn: 3600 },
          (err, token) => res.json({success: true, token: 'Bearer ' + token})
        );
    });
  });
});


// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/update', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  //SPECIAL Profile updates
  const userFields = {};
  if (req.body.email) userFields.email = req.body.email;
  if (req.body.avatar) userFields.avatar = req.body.avatar;
  if (req.body.username) userFields.username = req.body.username;

  if (!isEmpty(userFields)) {
    const { errors, isValid } = validateUser(req.body.username, true);
    if (!isValid) return res.status(400).json(errors);

    User.findOne({ user: req.user.id }).then(user => {
      if (userFields.avatar) user.avatar = userFields.avatar;
      
      if (userFields.email && userFields.email !== user.email) {
        User.findOne({ email: req.body.email }).then(u => {
          if (u) return res.status(400).json({username: 'Email already exists'});
            user.email = req.body.email;
          })
      }
      
      if (userFields.username && userFields.username !== user.username) {
        User.findOne({ username: req.body.username }).then(u => {
          if (u) return res.status(400).json({username: 'Username already exists'});
            user.username = req.body.username;
          })
      }
    })
  }
})

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      avatar: req.user.avatar,
      email: req.user.email
    });
  }
);


module.exports = router;