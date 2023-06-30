// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const dataSchema = new Schema({
//   name: String,
//   email: {
//     type: String,
//     unique: true,
//   },
//   phone_number: {
//     type: Number,
//     unique: true,
//   },
//   otp: {
//     type: Number,
//   },
//   password: String,
// });

// module.exports = mongoose.model("data", dataSchema);




const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  phone_number: {
    type: Number,
    unique: true,
  },
  otp: {
    type: String,
  },
  password: String,
  status:{
    type:String,
    default:"Inactive",
  },
  expirationTime:Date,


  


});

module.exports = mongoose.model("data", dataSchema);
