const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const indexSchema = new Schema({
    name: {type : String},
    email: String,
    password:String
});

indexSchema.index({name : 1})
module.exports = mongoose.model("index", indexSchema);
