const mongoose = require("mongoose");
require("dotenv").config();

const brandSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: 1,
    maxlength: 100
  }
});
const Brand = mongoose.model("Brand", brandSchema);
module.exports = { Brand };
