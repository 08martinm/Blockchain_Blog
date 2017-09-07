const router = require('express').Router();
const Emails = require('./emails.js');
const User = require('./users.js');
const Comments = require('./comments.js');
const Login = require('./login.js');
const Logout = require('./logout.js');
const path = require('path');
const passport = require('../passport.js');

// let authenticationMiddleware = () => {
//   return (req, res, next) => {
//     console.log( `req.session.user: ${JSON.stringify(req.session.passport)}`);
//     if (req.isAuthenticated()) return next();
//     res.redirect('/login');
//   };
// };
// Home
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'public', 'index.html'));
});

// Emails
router.get('/api/emails', Emails.get);
router.post('/api/emails', Emails.post);
router.put('/api/emails', Emails.verify);

// Users
router.get('/api/users', User.get);

// Posts
router.get('/api/comments', Comments.get);
router.post('/api/comments', passport.authenticate('local'), Comments.post);

// Login/Logout
router.post('/api/signup', Login.signup);
router.post('/api/login', passport.authenticate('local'), Login.login);
router.get('/api/logout', Logout.get);

module.exports = router;
