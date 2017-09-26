const Comments = require('../db/comments.js');

module.exports = {
  get: (req, res, next) => {
    Comments.find({'section_id': req.query.section_id, 'lesson_id': req.query.lesson_id}, (err, comments) => {
      if (err) return next(err);
      return res.status(200).json(comments);
    });
  },

  post: (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json('Must sign in');

    let newPost = {
      username: req.user.username,
      lesson_id: req.body.lesson_id,
      section_id: req.body.section_id,
      parent_id: req.body.parent_id,
      comment: req.body.comment,
    };

    console.log('newPost is', newPost);

    Comments.create(newPost, (err) => {
      if (err) throw err;
      return res.status(200).json('Success!');
    });
  },

  put: (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json('Must sign in');
    Comments.findById(req.body.id, (err, comment) => {
      if (err) throw err;
      if (req.user.username != comment.username) return res.status(401).json('Cannot edit other peoples posts');
      Comments.findByIdAndUpdate(req.body.id, {comment: req.body.comment}, (err, comment) => {
        return res.status(200).send('comment is now' + JSON.stringify(comment));
      });
    });
  },

  likes: (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json('Must sign in');
    Comments.findById(req.body.id, (err, comment) => {
      if (err) throw err;
      let newCount = comment.likes + 1;
      Comments.findByIdAndUpdate(req.body.id, {likes: newCount}, (err, comment) => {
        return res.status(200).send('Like count is now' + newCount);
      });
    });
  },

  delete: (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json('Must sign in');
    Comments.findById(req.params.id, (err, comment) => {
      if (req.user.username != comment.username) return res.status(401).json('Cannot delete other peoples posts');
      if (comment.level == 1) return res.status(401).json('Cannot delete top-level post');
      Comments.findByIdAndRemove(req.params.id, (err, comment) => {
        if (err) throw err;
        return res.status(200).send('deleted: ' + JSON.stringify(comment));
      });
    });
  },
};
