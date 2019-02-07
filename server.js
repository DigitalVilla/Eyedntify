const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const passport = require('passport');
const cors = require('cors');
const path = require('path');

//server setup 
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


//Routes
const users = require('./server/routes/api/users');
const posts = require('./server/routes/api/posts');
const profile = require('./server/routes/api/profile');
const files = require('./server/routes/api/files');


// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(cors())

//DB connection
const db = require('./server/config/keys').database;
mongoose.connect(db,{
  useCreateIndex: true,
  useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))
mongoose.set('useFindAndModify', false)

// Passport Config
require('./server/config/passport')(passport);
require('./server/config/passSocketIO')(io);
//socket
require('./server/realtime/socket')(io);

// Use Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile); 
app.use('/api/files', files);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('./front_end/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'front_end', 'build', 'index.html'));
  });
}

// require('./server/realtime/ipAddress')
const port = process.env.PORT || 5000;
http.listen(port, () => console.log(`Server running on port ${port}`));
