const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();


app.use(express.static('build'))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.use('/', router);
app.listen(process.env.port || 3030);

console.log('Running at Port 3030');