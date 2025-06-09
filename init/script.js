const mongoose = require("mongoose")
const contactSchema = require("../model/contact-schema");
const Data = require("./contact")
// let Mongoo_url = 'mongodb://127.0.0.1:27017/portfolio';
let Mongoo_url = 'mongodb+srv://KanishkGour:asdf@portfolio-cluster.tkv6yn9.mongodb.net/?retryWrites=true&w=majority&appName=portfolio-Cluster';

const contact = mongoose.model('contact', contactSchema);

main()
    .then(() => console.log("customer DB Connected"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(Mongoo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000 // Increases timeout limit
    })
        .then(() => { console.log("Mongoo Is connected") })
        .catch((err) => { console.log("Mongoo Err : ", err) })
}


let insertContact = async () => {
    try {
        await contact.deleteMany({});
        console.log("Delete");
        await contact.insertMany(Data);
        console.log(`Inserted contacts ${Data.length} `);
    } catch (err) {
        console.log(err)
    }
}

// insertContact();

module.exports = contact;