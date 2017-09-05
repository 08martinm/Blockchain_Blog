const Emails = require('../db/emails.js');
const mail = require('../nodemailer.js');
const crypto = require('crypto');

module.exports = {
  get: (req, res) => {
    Emails.getEmails((err, emails) => {
      if (err) throw err;
      res.json(emails);
    });
  },

  post: (req, res) => {
    let addr = req.body.email;
    let rand = Math.floor((Math.random() * 100) + 54);
    let hash = crypto.createHash('sha256').update(rand.toString(), 'utf8').digest('hex');

    Emails.addEmail({email: addr, hash: hash}, (err, email) => {
      if (err) throw err;
      mail.transporter.sendMail(mail.options(req, hash), mail.cb);
      res.json(email);
    });
  },

  verify: (req, res) => {
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
  },
};
