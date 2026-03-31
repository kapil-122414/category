const { Schema, model } = require("mongoose");

const categoryschema = new Schema({
  Img: {
    type: String,
  },
  Categoryname: {
    type: String,
    required: true,
  },

  Slug: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
});

module.exports = model("category", categoryschema);
