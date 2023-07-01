const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    // unique: true,
  },
  emp_Id: {
    type: Number,
    // unique: true,
  },
  role: String,
  salary: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
