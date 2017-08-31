let router = require('express').Router();
let Emails = require('./db/emails.js');
let Posts = require('./db/posts.js');
let mail = require('./nodemailer.js');
let crypto = require('crypto');

router.route('/api/emails').get((req, res) => {
  Emails.getEmails((err, emails) => {
    if (err) throw err;
    res.json(emails);
  });
});

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
  console.log('data is', req.body, data);
  Posts.addPost(data, (err, post) => {
    console.log('proceeding to add post', post);
    if (err) throw err;
    res.json(post);
    console.log('added post');
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

module.exports = router;
