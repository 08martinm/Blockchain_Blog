const mongoose = require('mongoose');

let emailSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

let Email = mongoose.model('Email', emailSchema);

module.exports.Email = Email;
module.exports.getEmails = (cb, limit) => Email.find(cb).limit(limit);
module.exports.addEmail = (email, cb) => Email.create(email, cb);