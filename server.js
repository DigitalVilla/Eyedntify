const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const passport = require('passport');
const path = require('path');

//Routes
const users = require('./back_end/routes/api/users');
const posts = require('./back_end/routes/api/posts');
const profile = require('./back_end/routes/api/profile');

//server setup 
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(bodyParser.json());

// Passport Config
require('./back_end/config/passport')(passport);
require('./back_end/config/passSocketIO')(io);
//socket
require('./back_end/realtime/socket')(io);

const db = require('./back_end/config/keys').database;

mongoose.connect(db,{
  useCreateIndex: true,
  useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile); 
app.use('/api/posts', posts);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('./front_end/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
http.listen(port, () => console.log(`Server running on port ${port}`));
