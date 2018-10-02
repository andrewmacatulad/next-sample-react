const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  // email: { type: String, unique: true, lowercase: true, trim: true },
  email: String,
  name: String,
  admin: { type: Boolean, default: false },
  googleId: String,
  createdAt: { type: Date, default: Date.now }
});

mongoose.model("users", userSchema);
