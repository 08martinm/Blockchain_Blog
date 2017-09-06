const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./db/users.js');

passport.serializeUser(function(id, done) {
  done(null, id);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

// passport.use('local-login', new LocalStrategy({
//   usernameField : 'logemail',
//   passwordField : 'logpassword',
//   passReqToCallBack: true,
// }, function(req, user, done){
//   console.log('user is', user);
//   console.log('done is', done);
//   User.findOne(
//     {email: req.body.email},
//     (err, user) => {
//       if (err) return done(err);
//       if (!user) {
//         console.log('Incorrect username');
//         return done(null, false);
//       } else if (!user.validPassword(req.body.password)) {
//         console.log('Incorrect password');
//         return done(null, false);
//       } else {
//         console.log('Success!');
//         return done(null, user);
//       }
//     });
// })
// );

module.exports = passport;
