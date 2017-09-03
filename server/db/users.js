const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    default: true,
  },
});

UserSchema.statics.authenticate = (email, pw, cb) => {
  User.findOne({email: email})
    .exec((err, user) => {
      if (err) throw err;
      if (!user) {
        let err = new Error('User not found.');
        err.status = 401;
        return cb(err);
      }
      bcrypt.compare(pw, user.password, (err, result) => {
        if (result === true) return cb(null, user);
        return cb();
      });
    });
};

UserSchema.pre('save', function(next) {
  let user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) throw err;
    user.password = hash;
    next();
  });
});

let User = mongoose.model('User', UserSchema);

module.exports = User;
