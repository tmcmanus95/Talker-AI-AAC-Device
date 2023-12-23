const { Schema, Types } = require("mongoose");

const responseSchema = new Schema(
  {
    responseText: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = responseSchema;
