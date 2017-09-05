const router = require('express').Router();
const Emails = require('./emails.js');
const Comments = require('./comments.js');
const Login = require('./logins.js');
const Logout = require('./logouts.js');
const path = require('path');

// Home
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'public', 'index.html'));
});

// Emails
router.get('/api/emails', Emails.get);
router.post('/api/emails', Emails.post);
router.get('/api/verify', Emails.verify);

// Posts
router.get('/api/posts', Comments.get);
router.post('/api/posts', Comments.post);

// Login/Logout
router.post('/api/login', authenticationMiddleware, Login.post);
router.get('/api/logout', Logout.get);

let authenticationMiddleware = () => {
  return (req, res, next) => {
    console.log( `req.session.user: ${JSON.stringify(req.session.passport)}`);
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
  };
};

module.exports = router;
