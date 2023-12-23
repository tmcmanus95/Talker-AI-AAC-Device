const { Schema, model } = require("mongoose");
const Response = require("./Response");

// Schema to create Topic model
const topicSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    promptText: {
      type: String,
      minLength: 1,
      maxLength: 500,
    },
    responses: [Response],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Initialize our Topic model
const Topic = model("topic", topicSchema);

module.exports = Topic;
