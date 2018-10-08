const mongoose = require("mongoose");
const { Schema } = mongoose;

const tagSchema = new Schema({
  name: String,
  slug: String
});

mongoose.model("tags", tagSchema);
