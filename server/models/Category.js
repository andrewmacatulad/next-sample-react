const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: String,
  slug: String
});

mongoose.model("category", categorySchema);
