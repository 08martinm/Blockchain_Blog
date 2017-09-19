const mongoose = require('mongoose');

let CommentsSchema = new mongoose.Schema({
  username: {
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
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  comment: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  children: {
    type: Array,
    default: [],
  },
});

let Comments = mongoose.model('Comments', CommentsSchema);
module.exports = Comments;
