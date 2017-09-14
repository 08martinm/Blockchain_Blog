const mongoose = require('mongoose');

let CommentsSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  lesson_id: {
    type: String,
    required: true,
  },
  section_id: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

let Comments = mongoose.model('Comments', CommentsSchema);

module.exports = Comments;
