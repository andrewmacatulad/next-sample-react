const mongoose = require("mongoose");
const { Schema } = mongoose;

const imagesSchema = new mongoose.Schema({
  url: { type: String, unique: true },
  name: String,
  size: Number,
  created: { type: Date, default: Date.now },
  _user: { type: Schema.Types.ObjectId, ref: "users" }
});

const Images = mongoose.model("images", imagesSchema);

module.exports = Images;
