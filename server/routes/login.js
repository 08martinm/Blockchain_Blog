const User = require('../db/users.js');
const passport = require('../passport.js');

module.exports = {
  post: (req, res) => {
    // If login request has all fields to create a new user
    if (
      req.body.email &&
      req.body.username &&
      req.body.password &&
      req.body.confpassword
    ) {
      // Create new user object
      let userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        confpassword: req.body.confpassword,
      };

      // Prevent duplicate username
      User.find({username: userData.username}, (err, data) => {
        if (err) throw err;
        if (data.length != 0) return res.json('Username taken');
        // Prevent duplicate email
        User.find({email: userData.email}, (err, data) => {
          if (err) throw err;
          if (data.length != 0) return res.json('Email taken');
          // Create new user
          User.create(userData, (err, user) => {
            if (err) throw err;
            console.log(user._id);
            // Passport provides login function - passes to serializeUser
            req.login(user._id, (err) => {
              if (err) throw err;
              return res.json('Profile created');
            });
          });
        });
      });
    // If login request has fields to login
    } else if (
      req.body.logemail &&
      req.body.logpassword
    ) {
      let email = req.body.logemail;
      let pw = req.body.password;
      passport.authenticate('local-login', {
        failureRedirect: '/login',
        failureFlash: true,
        successFlash: 'Welcome!',
      })(req, email, pw);
    // If login request doesn't have required fields
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return res.json('All fields required');
    }
  },
};
