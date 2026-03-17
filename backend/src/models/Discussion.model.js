const mongoose = require('mongoose');

const replySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: { type: String, required: true, maxlength: 1000 },
  },
  { timestamps: true }
);

const discussionSchema = new mongoose.Schema(
  {
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
      required: true,
    },
    question_index: { type: Number, required: true }, // index in chapter.sections[x].questions
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      required: true,
    },
    content: {
      type: String,
      required: [true, 'Discussion content is required'],
      maxlength: [2000, 'Content cannot exceed 2000 characters'],
    },
    language: {
      type: String,
      enum: ['hi', 'en'],
      default: 'hi',
    },
    is_approved: { type: Boolean, default: false },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    replies: [replySchema],
  },
  { timestamps: true }
);

discussionSchema.index({ chapter: 1, question_index: 1 });
discussionSchema.index({ school: 1 });
discussionSchema.index({ author: 1 });

module.exports = mongoose.model('Discussion', discussionSchema);
