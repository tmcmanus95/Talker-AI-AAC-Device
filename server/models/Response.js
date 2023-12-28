const { Schema, model } = require("mongoose");

const responseSchema = new Schema(
  {
    responseText: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      // required: true,
    },
    topic: {
      type: Schema.Types.ObjectId,
      ref: "Topic", // Reference to the Topic model
      // required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Response = model("Response", responseSchema);

module.exports = Response;
