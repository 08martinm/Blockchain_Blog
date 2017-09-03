const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes.js');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');

let app = express();
const MongoStore = require('connect-mongo')(session);
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/blog');
let db = mongoose.connection;

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard king',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: db }),
}));
app.use(routes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'public', 'index.html'));
});

app.listen(port, () => {
  console.log('Server is listening on port', port);
});
