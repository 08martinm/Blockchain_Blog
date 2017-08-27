const nodemailer = require('nodemailer');
const keychain = require('../keychain.js');

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: 'the.blockchain.blog@gmail.com',
    pass: keychain.smtp,
  },
});

// setup email data with unicode symbols
let mailOptions = {
  from: '"The Blockchain Blog 👻" <the.blockchain.blog@gmail.com>', // sender address
  to: '08martinm@gmail.com', // list of receivers
  subject: 'Mailing List - Confirmation Required ✔', // Subject line
  text: 'Hi, you signed up to be a part of The Blockchain Blog mailing list.', // plain text body
  html: '<p>Hi, you signed up to be a part of The Blockchain Blog mailing list.</p>', // html body
};

// send mail with defined transport object
let transporterCb = (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message %s sent: %s', info.messageId, info.response);
};

// verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

module.exports.transporter = transporter;
module.exports.cb = transporterCb;
module.exports.options = mailOptions;