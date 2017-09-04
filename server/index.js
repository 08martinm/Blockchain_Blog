const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes.js');
const session = require('express-session');
const mongoose = require('mongoose');
const morgan = require('morgan');
const port = process.env.PORT || 5000;

const MongoStore = require('connect-mongo')(session);
mongoose.connect('mongodb://localhost/blog');
let db = mongoose.connection;

let app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard king',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: db }),
}));
app.use(express.static(__dirname + '/../public'));
app.use(routes);

app.listen(port,() => console.log('Server on:', port));
