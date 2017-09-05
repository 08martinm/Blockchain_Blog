const Comments = require('../db/comments.js');
const User = require('../bd/users.js');

module.exports = {
  get: (req, res) => {
    Comments.getComments({section_id: req.query.id}, (err, posts) => {
      if (err) throw err;
      res.json(posts);
    });
  },

  post: (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
      if (err) throw err;
      if (req.session.id === user._id) {
        let data = {
          section_id: req.body.section_id,
          comment: req.body.comment,
          username: req.body.username,
        };

        Comments.addComment(data, (err, post) => {
          if (err) throw err;
          res.json(post);
        });
      } else {
        res.json('Must sign in first');
      }
    });
  },
};
