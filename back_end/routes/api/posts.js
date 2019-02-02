const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
// Profile model
const User = require('../../models/User');
// Validation
const validatePostInput = require('../../validation/post');

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
    .populate('likes',  ['username', 'avatar'])
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
    .populate('likes',  ['username', 'avatar'])
    .populate({ 
      path: 'comments',
      model: 'Comment',
      populate: {
        path: 'user',
        model: 'User',
        select: ['avatar','username']
      }
    })
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const newPost = new Post({
      owner: req.user.id,
      caption: req.body.caption,
      image: req.body.image,
    });

    newPost.save()
    .then(post => res.json(post));
  }
);


// @route   POST api/posts
// @desc    Create post
// @access  Private
router.put('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.id) .then(post => {
    
    const myLikes = post.likes;
    myLikes.push(req.user.id);
    console.log(myLikes);
    const updates = {};
    updates.likes =  myLikes;

    Post.findOneAndUpdate({_id : req.params.id},  { $set: updates},{ new: true })
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
  })
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.put('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput({caption:req.body.text},true);
  if (!isValid) return res.status(400).json(errors);
  
  Post.findById(req.params.id) .then(post => {
    const newComment = new Comment({
      user : req.user.id,
      text : req.body.text
    }); 
    newComment.save()
    
    const myComms = post.comments;
    myComms.push(newComment);

    const updates = {};
    updates.comments =  myComms;

    Post.findOneAndUpdate({_id : req.params.id},  { $set: updates},{ new: true })
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
  })
});

// @route   POST api/posts
// @desc    Create post
// // @access  Private
// router.delete('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
//   const { errors, isValid } = validatePostInput(req.body);
//   if (!isValid) return res.status(400).json(errors);

//   const newPost = new Post({
//     owner: req.user.id,
//     caption: req.body.caption,
//     image: req.body.image,
//   });

//   newPost.save()
//   .then(post => res.json(post));
// }
// );


// @route   POST api/posts
// @desc    Create post
// @access  Private
router.put('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.id) .then(post => {
    
    const myLikes = post.likes;
    myLikes.push(req.user.id);
    console.log(myLikes);
    const updates = {};
    updates.likes =  myLikes;

    Post.findOneAndUpdate({_id : req.params.id},  { $set: updates},{ new: true })
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
  })
});




module.exports = router;