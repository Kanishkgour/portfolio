const { name } = require("ejs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    message: { type: String, required: true }
});

// const contactSchema = new Schema ({
//     name : String ,
//     email : String ,
//     mobile : Number,
//     message : String,
// })

module.exports = contactSchema;