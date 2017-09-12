module.exports = {
  get: (req, res) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      req.session.destroy(function() {
        res.clearCookie('connect.sid', {path: '/'});
        req.logout();
        res.status(200).json('Successfully logged out.');
      });
    } else {
      res.status(401).json('Already signed out.');
    }
  },
};
