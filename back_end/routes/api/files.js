const GridFsStorage = require('multer-gridfs-storage');
const mongoURI = require('../../config/keys').database;
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const passport = require('passport');
const express = require('express');
const router = express.Router();

const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const User = require('../../models/User');

const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useCreateIndex: true, })
mongoose.set('useFindAndModify', false)

const DB_A = "avatar";
const DB_P = "iPost";
const DB_B = "banner";

// Init gfs
let gfs_A, gfs_P, gfs_B;
conn.once('open', () => {
  // Init stream
  console.log('MongoDB createConnection')
  gfs_A = Grid(conn.db, mongoose.mongo);
  gfs_A.collection(DB_A);
  gfs_P = Grid(conn.db, mongoose.mongo);
  gfs_P.collection(DB_P);
  gfs_B = Grid(conn.db, mongoose.mongo);
  gfs_B.collection(DB_B);
});

// Create storage engine
const storageDB = (dbName) => {
  return new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: dbName
          };
          resolve(fileInfo);
        });
      });
    }
  });
}

const fileFilter = (req, file, next) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    next(null, true);
  } else {
    next(null, false);
  }
};

const upload_A = multer({
  storage: storageDB(DB_A),
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 / 3
  }
});
const upload_P = multer({
  storage: storageDB(DB_P),
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 / 2
  }
});
const upload_B = multer({
  storage: storageDB(DB_B),
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 / 2
  }
});


// @route   GET api/files
// @desc    Get profile by user ID
// @access  Public
// @route GET /image/:filename
// @desc Display Image
router.get('/avatar/:filename', (req, res) => {
  gfs_A.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0)
      return res.status(404).json({ err: 'No file exists' });
    const readStream = gfs_A.createReadStream(file.filename);
    readStream.pipe(res);
  });
});
// @route   GET api/files
// @desc    Get profile by user ID
// @access  Public
// @route GET /image/:filename
// @desc Display Image
router.get('/post/:filename', (req, res) => {
  gfs_P.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0)
      return res.status(404).json({ err: 'No file exists' });
    const readStream = gfs_P.createReadStream(file.filename);
    readStream.pipe(res);
  });
});

// @route   GET api/files
// @desc    Get profile by user ID
// @access  Public
// @route GET /image/:filename
// @desc Display Image
router.get('/banner/:filename', (req, res) => {
  gfs_B.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0)
      return res.status(404).json({ err: 'No file exists' });
    const readStream = gfs_B.createReadStream(file.filename);
    readStream.pipe(res);
  });
});

// @route POST /files
// @desc  Uploads file to DB
router.post('/avatar', upload_A.single('file'), passport.authenticate('jwt', { session: false }), (req, res) => {
  gfs_A.files.findOne({ filename: req.user.avatar }, (err, file) => {
    if (file !== null)
      gfs_A.remove({ _id: file['_id'], root: DB_A }, (err, gridStore) => console.log(err?err:''));
      
    User.findOneAndUpdate({ username: req.user.username }, { $set: { avatar: req.file.filename } }, { new: true })
      .then((user) => res.json(user.avatar))
      .catch(err => res.status(400).json(parse(err.errmsg)))
  });
});

// @route POST /files
// @desc  Uploads file to DB
router.post('/banner', upload_B.single('file'), passport.authenticate('jwt', { session: false }), (req, res) => {
  gfs_B.files.findOne({ filename: req.user.banner }, (err, file) => {
    if (file !== null)
      gfs_B.remove({ _id: file['_id'], root: DB_B }, (err, gridStore) => console.log(err?err:''));

  User.findOneAndUpdate({ username: req.user.username }, { $set: { banner: req.file.filename } }, { new: true })
    .then((user) => res.json(user.banner))
    .catch(err => res.status(400).json(parse(err.errmsg)))
  });
});

// // @route POST /files
// // @desc  Uploads file to DB
// router.post('/post', upload_P.single('file'), passport.authenticate('jwt', { session: false }), (req, res) => {
//   res.json(req.file.filename);
// });


// exception to create and delete 
// @route   POST api/files
// @desc    Create post
// @access  Private
router.post('/newPost',upload_P.single('file'), passport.authenticate('jwt', { session: false }), (req, res) => {
    const newPost = new Post({
      owner: req.user.id,
      caption: req.body.caption,
      image: req.file.filename
    });

    newPost.save()
    .then(post => res.json({ok:true}))
    .catch(err => res.status(400).json(parse(err.errmsg)))
});


// @route   POST api/posts
// @desc    Create post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {


  const newPost = new Post({
    owner: req.user.id,
    caption: req.body.caption,
    image: req.body.image,
  });

  newPost.save()
  .then(post => res.json(post));
}
);




module.exports = router;


// https://www.youtube.com/watch?v=3f5Q9wDePzY