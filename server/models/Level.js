const mongoose = require("mongoose");

const { Schema } = mongoose;

const levelSchema = new Schema({
  level: { type: Number, default: 0 },
  experience: Number
});

mongoose.model("levels", levelSchema);
