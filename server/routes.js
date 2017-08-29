let router = require('express').Router();
let db = require('./db/schema.js');
let mail = require('./nodemailer.js');
let crypto = require('crypto');

router.route('/api/emails').get((req, res) => {
  db.getEmails((err, emails) => {
    if (err) throw err;
    res.json(emails);
  });
});

router.route('/api/emails').post((req, res) => {
  let addr = req.body.email;
  let rand = Math.floor((Math.random() * 100) + 54);
  let hash = crypto.createHash('sha256').update(rand.toString(), 'utf8').digest('hex');

  db.addEmail({email: addr, hash: hash}, (err, email) => {
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

  db.findHash(req.query.id, update, (err, email) => {
    if (err) throw err;
    if (email) {
      console.log('Your email has been verified');
      res.redirect('/api/verify');
    } else {
      console.log('email not verified - invalid hash');
      res.json('Invalid validation attempt');
    }
  });
});

module.exports = router;
