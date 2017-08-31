const mongoose = require('mongoose');

let postsSchema = mongoose.Schema({
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

let Posts = mongoose.model('Posts', postsSchema);

module.exports.Posts = Posts;
module.exports.getPosts = (section_id, cb, limit) => Posts.find(section_id, cb).limit(limit);
module.exports.addPost = (data, cb) => Posts.create(data, cb);
