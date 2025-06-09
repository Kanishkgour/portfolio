const { name } = require("ejs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const contactSchema = new Schema ({
    name : String,
    email : String ,
    mobile : Number,
    message : String,
})

module.exports = contactSchema;