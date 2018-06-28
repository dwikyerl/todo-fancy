const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const todoSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: 'Author is required',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    deadline: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Todo', todoSchema);
