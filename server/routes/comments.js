const Comments = require('../db/comments.js');

module.exports = {
  get: (req, res) => {
    Comments.find({'section_id': req.query.section_id, 'lesson_id': req.query.lesson_id}, (err, comments) => {
      if (err) throw err;
      return res.status(200).json(comments);
    });
  },

  post: (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json('Must sign in');

    let newPost = {
      username: req.user.username,
      lesson_id: req.body.lesson_id,
      section_id: req.body.section_id,
      comment: req.body.comment,
    };

    Comments.create(newPost, (err, post) => {
      if (err) throw err;
      return res.status(200).json(post);
    });
  },
};
