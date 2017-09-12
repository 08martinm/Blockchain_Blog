const User = require('../db/users.js');
const nodemailer = require('nodemailer');
const keychain = require('../../keychain.js');

module.exports = {
  post: (req, res) => {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        return res.status(400).json('error: Password reset token is invalid or has expired.');
      }

      user.password = req.body.password;
      console.log('password is', user.password);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      user.save(function(err) {
        if (err) throw err;
        req.logIn(user, function(err) {
          if (err) throw err;
          let smtpTransport = nodemailer.createTransport(options);
          smtpTransport.sendMail(mailOptions_Confirm(user), err => {
            if (err) throw err;
            return res.json('Success! Your password has been changed.');
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

let mailOptions_Confirm = user => ({
  from: '"The Blockchain Blog 🔲⛓️" <the.blockchain.blog@gmail.com>', // sender address
  to: '08martinm@gmail.com', // list of receivers
  subject: 'Your Password Has Been Reset', // Subject line
  html: 'Hi,<br><br>This is a confirmation that the password for your account ' + user.email + ' has just been changed.<br><br>',
});
