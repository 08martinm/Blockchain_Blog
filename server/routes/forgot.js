const crypto = require('crypto');
const User = require('../db/users.js');
const nodemailer = require('nodemailer');
const keychain = require('../../keychain.js');

module.exports = {
  post: (req, res, next) => {
    crypto.randomBytes(20, function(err, buf) {
      var token = buf.toString('hex');
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          if (err) throw err;
          let smtpTransport = nodemailer.createTransport(options);
          smtpTransport.sendMail(mailOptions_Reset(req, token), err => {
            if (err) return next(err);
            res.redirect('/login');
          });
        });
      });
    });
  },
};

let options = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: 'the.blockchain.blog@gmail.com',
    pass: keychain.smtp,
  },
};

let mailOptions_Reset = (req, token) => {
  let link = 'http://' + req.get('host') + '/api/forgot/' + token;
  return({
    from: '"The Blockchain Blog 🔲⛓️" <the.blockchain.blog@gmail.com>', // sender address
    to: '08martinm@gmail.com', // list of receivers
    subject: 'Password Reset', // Subject line
    html: 'Hi,<br><br>We received a notification that you would like to reset your password.<br><br>' + 
      'Please Click on the link below to verify your email.<br><br>' + 
      '<a href=' + link + '>Click here to verify.</a>', // html body
  });
};
