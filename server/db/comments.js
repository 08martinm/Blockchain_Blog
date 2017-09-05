const mongoose = require('mongoose');

let CommentsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  loggedIn: {
    type: Boolean,
    default: false,
  },
  section_id: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
  comment: {
    type: String,
    required: true,
  },
});

let Comments = mongoose.model('Comments', CommentsSchema);

module.exports.Comments = Comments;
module.exports.getComments = (section_id, cb, limit) => Comments.find(section_id, cb).limit(limit);
module.exports.addComment = (data, cb) => Comments.create(data, cb);
