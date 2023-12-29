const { Schema, model } = require("mongoose");

const responseSchema = new Schema(
  {
    responseText: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
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
