const mongoose = require('mongoose');

let EmailSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  hash: {
    type: String,
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

let Email = mongoose.model('Email', EmailSchema);

module.exports.Email = Email;
module.exports.getEmails = (cb, limit) => Email.find(cb).limit(limit);
module.exports.addEmail = (data, cb) => Email.create(data, cb);
module.exports.findHash = (val, update, cb) => Email.findOneAndUpdate({hash: val}, update, cb);
