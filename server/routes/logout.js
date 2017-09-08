module.exports = {
  get: (req, res) => {
    console.log(req.session.authenticated);
    if (req.session.authenticated) {
      req.session.destroy(function() {
        res.clearCookie('connect.sid', {path: '/'});
        req.logout();
        res.json(req.user);
      });
    } else {
      res.json('Already signed out');
    }
  },
};
