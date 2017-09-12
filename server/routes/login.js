const User = require('../db/users.js');
// const passport = require('../index.js');

module.exports = {
  signup: (req, res, next) => {
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
        if (data.length != 0) return res.status(401).json('That username has already been taken!');
        User.find({email: req.body.email}, (err, data) => {
          if (err) throw err;
          if (data.length != 0) return res.status(401).json('We already have that email on file!');
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
      return res.status(401).json('All fields required');
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
      res.status(401).json('Incorrect username or password!');
    }
  },
};
