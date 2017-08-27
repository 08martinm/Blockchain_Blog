let router = require('express').Router();
let db = require('./db/schema.js');
let mail = require('./nodemailer.js');

router.route('/api/emails').get((req, res) => {
  db.getEmails((err, emails) => {
    if (err) throw err;
    res.json(emails);
  });
});

router.route('/api/emails').post((req, res) => {
  let email = req.body;
  console.log('email is', email.email);
  db.addEmail(email, (err, email) => {
    if (err) throw err;
    mail.transporter.sendMail(mail.options, mail.cb);
    res.json(email);
  });
});

module.exports = router;
