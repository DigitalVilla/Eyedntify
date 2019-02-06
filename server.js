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
const users = require('./back_end/routes/api/users');
const posts = require('./back_end/routes/api/posts');
const profile = require('./back_end/routes/api/profile');
const files = require('./back_end/routes/api/files');


// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(cors())

//DB connection
const db = require('./back_end/config/keys').database;
mongoose.connect(db,{
  useCreateIndex: true,
  useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))
mongoose.set('useFindAndModify', false)

// Passport Config
require('./back_end/config/passport')(passport);
require('./back_end/config/passSocketIO')(io);
//socket
require('./back_end/realtime/socket')(io);

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
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// require('./back_end/realtime/ipAddress')
const port = process.env.PORT || 5000;
http.listen(port, () => console.log(`Server running on port ${port}`));
