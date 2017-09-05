const LocalStrategy = require('passport-local').Strategy;
const User = require('./db/users.js');

module.exports = passport => {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-login', new LocalStrategy({
    usernameField : 'logemail',
    passwordField : 'logpassword',
    passReqToCallback : true,
  }, (req, email, password, done) => {
    User.findOne({ 'local.email' : email },
      function(err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, {message: 'Incorrect username.'});
        if (!user.validPassword(password)) {
          return done(null, false, {message: 'Incorrect password.'});
        } else return done(null, user);
      });
  }));
};
