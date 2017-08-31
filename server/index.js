const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const routes = require('./routes.js');
const path = require('path');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');

let app = express();

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(routes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'public', 'index.html'));
});


app.listen(port, () => {
  console.log('Server is listening on port', port);
});
