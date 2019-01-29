const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const path = require('path');
const router = express.Router();

const app = express();


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.use('/', router);

const port = process.env.port || 3030;

app.listen(port, err => {
  if (err) console.log(err);
  console.log(`Running at Port ${port}`);

});