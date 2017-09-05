const passport = require('passport');

module.exports = {
  get: (req, res) => {
    if (req.session) {
      req.logout();
      req.session.destroy((err) => {
        if (err) throw err;
        return res.json('signed out');
      });
    }
  },
};
