const router = require('express').Router();
const Emails = require('./emails.js');
const User = require('./users.js');
const Comments = require('./comments.js');
const Login = require('./login.js');
const Logout = require('./logout.js');
const Forgot = require('./forgot.js');
const Reset = require('./reset.js');
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
router.get('/api/verify', Emails.verify);

// Users
router.get('/api/users', User.get);

// Comments
router.get('/api/comments', Comments.get);
router.post('/api/comments', Comments.post);
router.put('/api/comments', Comments.put);
router.put('/api/likes', Comments.likes);

router.delete('/api/comments/:id', Comments.delete);

// Login/Logout
router.post('/api/signup', Login.signup);
router.post('/api/login', passport.authenticate('local'), Login.login);
router.get('/api/loggedin', Login.auth);
router.get('/api/logout', Logout.get);
router.post('/api/forgot', Forgot.post);
router.post('/api/reset/:token', Reset.post);

module.exports = router;
