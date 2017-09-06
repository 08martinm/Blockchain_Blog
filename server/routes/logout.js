module.exports = {
  get: (req, res) => {
    if (req.isAuthenticated()) {
      req.logout();
      req.session.destroy((err) => {
        if (err) throw err;
        return res.json('signed out');
      });
    } else {
      return res.json('Already signed out');
    }
  },
};
