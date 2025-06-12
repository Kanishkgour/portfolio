const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const app = express();
const ejsMate = require("ejs-mate");
const Contact = require("./init/script"); // Ensure correct import
const flash = require("connect-flash");
const session = require("express-session");
const expressError = require("./utils/expressError");
const wrapAsync = require("./utils/wrapAsync")

console.log("wrapasync", wrapAsync())
const Mongo_url = "mongodb+srv://KanishkGour:asdf@portfolio-cluster.tkv6yn9.mongodb.net/?retryWrites=true&w=majority&appName=portfolio-Cluster";


// 🟢 Ensure MongoDB Connection Happens First

async function connectDB() {
    try {
        await mongoose.connect(Mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000 // Increased timeout
        });
        console.log("✅ MongoDB connected successfully!");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
    }
}

// 🔄 Call DB Connection Before Importing Models
connectDB();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layout/boilerplate"); // No ".ejs" needed

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

app.engine("ejs", ejsMate);

// 🟢 Middleware to Handle Flash Messages
app.use((req, res, next) => {
    res.locals.success = req.flash("success")[0] || null;
    res.locals.error = req.flash("error")[0] || null;
    next();
});

// 🏠 Routes
app.get("/home", (req, res) => {
    res.render("home.ejs");
});

app.get("/project", (req, res) => {
    res.render("project.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/blog", (req, res) => {
    // throw new expressError(404, "You have not access to read this page");
    res.send("Blog Post");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

// 📩 Contact Form Submission Route
app.post("/contact/data", wrapAsync(async (req, res, next) => {

    let { name, message, email, mobile } = req.body;
    console.log(name, message, email, mobile);

    // ✅ Fixed Mongoose `.insertOne()` issue (use `.save()` instead)
    const newContact = new Contact({ name, email, message, mobile });
    await newContact.save();

    req.flash("success", "You will receive a response within 24 hours. If Your information is correct.");
    res.redirect("/home");

}));
// app.post("/contact/data", async ( req, res  , next)  => {
//     try {
//         let { name, message, email, mobile } = req.body;
//         console.log(name, message, email, mobile);

//         // ✅ Fixed Mongoose `.insertOne()` issue (use `.save()` instead)
//         const newContact = new Contact({ name, email, message, mobile });
//         await newContact.save();

//         req.flash("success", "You will receive a response within 24 hours. If Your information is correct.");
//         res.redirect("/home");

//     } catch (err) {
//         // console.error("❌ Error saving contact:", err);
//         // req.flash("error", "Internal Server Error Please try again after some time.");
//         // res.redirect("/home");
//         next(err);
//     }
// });



app.post("/contact/info", (req, res) => {
    res.send("Contact Info Working");
});

// 📚📚📚📚📚📚📚📚📚📚 project specific route
app.post("/home/project/airbnb", (req, res, next) => {
    res.send("Working on the project please wait for 2 days");
})
app.post("/home/project/zerodha", (req, res, next) => {
    res.send("Working on the project please wait for 2 days");
})
app.post("/home/project/openai", (req, res, next) => {
    res.send("Working on the project please wait for 2 days");
})
app.post("/home/project/amazon", (req, res, next) => {
    res.send("Working on the project please wait for 2 days");
})
// http://localhost:8080/home/project/airbnb
// 📚📚📚📚📚📚📚📚📚📚


app.get("/kanishkgour0@gmail.com", (req, res) => {
    res.send("Email Page Working");
});

app.all('/{*any}', (req, res, next) => {
    // next(new Error(`Can't find ${req.originalUrl} on this server!`));
    // let routeError = req.originalUrl
    res.render("error.ejs")
    // res.send("not Send")
});



// app.use((err, req, res, next) => {
//     console.log("Name of error : ", err.name)
//     // if(err.name === "ValidationError"){
//     //     console.log("This Was A Validation Error. Follow Rules Please")
//     // }

//     next(err);
// })



// 🔴 Error Handling Middleware
app.use((err, req, res, next) => {
    console.log('An error occurred:', err.message);
    const { status = 400, message = "Error not specified" } = err;
    // res.status(status).json({ error: message });
    res.render("error.ejs")
    // res.status(status).send(err.message);

});


// 🚀 Start Server
app.listen(8080, () => {
    console.log("Portfolio running on Port 8080 ✅");
});
