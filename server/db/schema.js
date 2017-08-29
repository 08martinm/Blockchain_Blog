const mongoose = require('mongoose');

let emailSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  hash: {
    type: Number,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

let Email = mongoose.model('Email', emailSchema);

module.exports.Email = Email;
module.exports.getEmails = (cb, limit) => Email.find(cb).limit(limit);
module.exports.addEmail = (data, cb) => Email.create(data, cb);
module.exports.findHash = (val, update, cb) => Email.findOneAndUpdate({hash: val}, update, cb);
