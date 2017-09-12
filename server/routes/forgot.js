const crypto = require('crypto');
const User = require('../db/users.js');
const nodemailer = require('nodemailer');
const keychain = require('../../keychain.js');

module.exports = {
  post: (req, res, next) => {
    crypto.randomBytes(20, function(err, buf) {
      var token = buf.toString('hex');
      console.log('req.body is', req.body);
      User.findOne({ forgotemail: req.body.email }, function(err, user) {
        if (!user) {
          return res.status(401).json('We do not have that email in our files.');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          if (err) throw err;
          let smtpTransport = nodemailer.createTransport(options);
          smtpTransport.sendMail(mailOptions_Reset(req, token), err => {
            if (err) return next(err);
            res.status(200).json('Open the link in the email we just sent you to reset your password.');
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
  let link = 'http://' + req.get('host') + '/reset/' + token;
  return({
    from: '"The Blockchain Blog 🔲⛓️" <the.blockchain.blog@gmail.com>', // sender address
    to: '08martinm@gmail.com', // list of receivers
    subject: 'Password Reset', // Subject line
    html: 'Hi,<br><br>We received a notification that you would like to reset your password.<br><br>' + 
      'Please click on the link below to reset your password.<br><br>' + 
      '<a href=' + link + '>Click here to reset your password.</a>', // html body
  });
};
