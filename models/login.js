const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  emp_Id: { type: String, default: "" },
  Ip_address: {
    type: String,
    default: "Ip_Address",
  },
  os: {
    type: String,
    default: "Operating system",
  },
  role: String,
  loginTime: { type: String },

  name: String,

  email: String,
  
  employees_Id: {
    type: String,
    required: true,
  },
  domain: String,
});

module.exports = mongoose.model("login", loginSchema);
