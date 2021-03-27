const mongoose = require("mongoose");

const { Schema } = mongoose;
const goodsSchema = new Schema({
  writtensId: {
    type: Number,
    require :true,
    unique: true
  },
  image_url: {
    type: String
  },
  category: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  user: {
    type: String
  },
  password: {
    type: String
  },
  date: {
    type : String
  }
});

module.exports = mongoose.model("Writtens", goodsSchema);