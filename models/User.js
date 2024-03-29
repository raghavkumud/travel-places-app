const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      require: true,
      max: 50,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
