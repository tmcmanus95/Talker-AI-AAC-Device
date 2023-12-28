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
      minlength: 1,
      maxlength: 500,
    },
    responses: [{ type: Schema.Types.ObjectId, ref: "Response" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Initialize our Topic model
const Topic = model("Topic", topicSchema);

module.exports = Topic;
