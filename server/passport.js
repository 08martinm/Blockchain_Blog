const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./db/users.js');

passport.serializeUser(function(id, done) {
  done(null, id);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

passport.use('local-login', new LocalStrategy({
  usernameField : 'logemail',
  passwordField : 'logpassword',
  passReqToCallback : true,
}, (req, email, password, done) => {
  console.log('email is', email);
  console.log('password is', password);
  User.findOne(
    {email: email},
    (err, user) => {
      console.log('user is', user);
      if (err) return done(err);
      if (!user) {
        console.log('Incorrect username');
        return done(null, false, {message: 'Incorrect password.'});
      } else if (!user.validPassword(password)) {
        console.log('Incorrect password');
        return done(null, false, {message: 'Incorrect password.'});
      } else {
        console.log('Success!');
        return done(null, user);
      }
    });
}));

module.exports = passport;
