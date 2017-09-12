const User = require('../db/users.js');
// const passport = require('../index.js');

module.exports = {
  signup: (req, res) => {
    if (req.body.password != req.body.confpassword) {
      return res.json('Passwords do not match');
    }
    
    if (
      req.body.email &&
      req.body.username &&
      req.body.password &&
      req.body.confpassword
    ) {
      User.find({username: req.body.username}, (err, data) => {
        if (err) throw err;
        if (data.length != 0) return res.status(400).json('Username taken');
        User.find({email: req.body.email}, (err, data) => {
          if (err) throw err;
          if (data.length != 0) return res.status(400).json('Email taken');
          User.create(req.body, (err, user) => {
            if (err) throw err;
            req.login(user._id, (err) => {
              if (err) throw err;
              return res.status(200).json('Profile created!');
            });
          });
        });
      });

    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return res.json('All fields required');
    }
  },

  login: (req, res, next) => {
    User.findOne({email: req.body.logemail}, (err, user) => {
      req.logIn(user, function(err) {
        if (err) return next(err);
        return res.json('Signed in');
      });
    });
  },

  auth: (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).json('Logged In');
    } else {
      res.status(401).json('Not logged in');
    }
  },
};
