const router = require('express').Router();
const Emails = require('./db/emails.js');
const Posts = require('./db/posts.js');
const User = require('./db/users.js');
const mail = require('./nodemailer.js');
const crypto = require('crypto');

// Emails
router.route('/api/emails').get((req, res) => {
  Emails.getEmails((err, emails) => {
    if (err) throw err;
    res.json(emails);
  });
});

router.route('/api/emails').post((req, res) => {
  let addr = req.body.email;
  let rand = Math.floor((Math.random() * 100) + 54);
  let hash = crypto.createHash('sha256').update(rand.toString(), 'utf8').digest('hex');

  Emails.addEmail({email: addr, hash: hash}, (err, email) => {
    if (err) throw err;
    mail.transporter.sendMail(mail.options(req, hash), mail.cb);
    res.json(email);
  });
});

router.route('/api/verify').get((req, res) => {
  let update = {
    verified: true,
    hash: null,
  };

  Emails.findHash(req.query.id, update, (err, email) => {
    if (err) throw err;
    if (email) {
      console.log('Your email has been verified');
      res.redirect('/verified');
    } else {
      console.log('email not verified - invalid hash');
      res.json('Invalid validation attempt');
    }
  });
});

// Posts
router.route('/api/posts').get((req, res) => {
  Posts.getPosts({section_id: req.query.id}, (err, posts) => {
    if (err) throw err;
    res.json(posts);
  });
});

router.route('/api/posts').post((req, res) => {
  let data = {
    section_id: req.body.section_id,
    comment: req.body.comment,
    username: req.body.username,
  };

  Posts.addPost(data, (err, post) => {
    if (err) throw err;
    res.json(post);
  });
});

// Users
router.route('/api/login').post((req, res) => {
  if (req.body.email && req.body.username && 
  req.body.password && req.body.confpassword) {
    let userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      confpassword: req.body.confpassword,
    };

    User.find({username: userData.username}, (err, data) => {
      if (err) throw err;
      if (data.length != 0) return res.json('Username already taken');
      User.find({email: userData.email}, (err, data) => {
        if (err) throw err;
        if (data.length != 0) return res.json('Email already taken');
        User.create(userData, (err, user) => {
          if (err) throw err;
          req.session.userId = user._id;
          return res.json('Profile created');
        });
      });
    });
  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, (error, user) => {
      if (error || !user) {
        let err = new Error('Wrong email or password.');
        err.status = 401;
        return res.json('Wrong email or password');
      } else {
        req.session.userId = user._id;
        return res.json('Logged In');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return res.json('All fields are required');
  }
});

router.route('/api/logout').get((req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) throw err;
      return res.json('signed out');
    });
  }
});

module.exports = router;
