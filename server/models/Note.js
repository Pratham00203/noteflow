const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  updatedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("note", NoteSchema);
