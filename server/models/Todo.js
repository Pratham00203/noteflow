const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
  },
  tasks: [
    {
      description: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: "Pending", // Pending -> Ongoing -> Done
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("todo", TodoSchema);
