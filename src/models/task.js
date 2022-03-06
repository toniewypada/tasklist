const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  taskDescription: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = Task;
