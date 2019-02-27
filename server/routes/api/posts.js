const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
// Profile model
const Profile = require('../../models/Profile');
// Validation
const validatePostInput = require('../../validation/post');
const u = require('../../utils/utils');


// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .populate('owner', ['username', 'avatar'])
    .populate('likes', ['username', 'avatar'])
    .populate({
      path: 'comments',
      model: 'Comment',
      populate: {
        path: 'user',
        model: 'User'
      }
    })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noposts: 'No posts found' }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .populate('owner', ['username', 'avatar'])
    .populate('likes', ['username', 'avatar'])
    .populate({
      path: 'comments',
      model: 'Comment',
      populate: {
        path: 'user',
        model: 'User',
        select: ['avatar', 'username']
      }
    })
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
});

// @route   POST api/posts/like/id
// @desc    handles like/unlike requests
// @access  Private
router.put('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.id).then(post => {

    const newLikes = u.swapR(post.likes, req.user.id + "");

    Post.findOneAndUpdate({ _id: req.params.id }, { $set: { likes: newLikes } }, { new: true })
      .then(post => res.json(post))
      .catch(err =>
        res.status(404).json({ nopostfound: 'No post found with that ID' })
      );
  })
});

// @route   POST api/posts/comment/id
// @desc    Create post
// @access  Private
router.put('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput({ caption: req.body.text }, true);
  if (!isValid) return res.status(400).json(errors);

  Post.findById(req.params.id).then(post => {
    const newComment = new Comment({
      user: req.user.id,
      text: req.body.text
    });
    newComment.save()

    const myComms = post.comments;
    myComms.push(newComment);

    const updates = {};
    updates.comments = myComms;

    Post.findOneAndUpdate({ _id: req.params.id }, { $set: updates }, { new: true })
      .then(post => res.json(post))
      .catch(err =>
        res.status(404).json({ nopostfound: 'No post found with that ID' })
      );
  })
});



// @route   POST api/posts
// @desc    Add/de;ete a post form faveorite list
// @access  Private
router.put('/favorite/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user._id }).then(profile => {
    //find if the postid is in the faves list
    const newFaves = u.swapR(profile.favorite, req.params.id);

    Profile.findOneAndUpdate({ user: req.user.id }, { $set: { favorite: newFaves } }, { new: true })
      .populate('user', ['username', 'avatar', 'banner'])
      .then(profile => res.json(profile));
  })
});


// @route   POST api/posts
// @desc    Add/de;ete a post form faveorite list
// @access  Private
router.put('/favorite/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user._id }).then(profile => {
    //find if the postid is in the faves list
    const newFaves = u.swapR(profile.favorite, req.params.id);

    Profile.findOneAndUpdate({ user: req.user.id }, { $set: { favorite: newFaves } }, { new: true })
      .populate('user', ['username', 'avatar', 'banner'])
      .then(profile => res.json(profile));
  })
});




module.exports = router;