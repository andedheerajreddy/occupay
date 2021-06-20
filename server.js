const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

var path = require('path');

const app = express();
app.set('views', path.join(__dirname, 'frontend', 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/frontend'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });
// app.use(cors());


const dbURI = process.env.dbURI;

mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.get("/", (req, res) => {
    res.render('home', { title: "home" })
})
app.get("/login", (req, res) => {
    res.render('login', { title: "home" })
})
app.get("/register", (req, res) => {
    res.render('register', { title: "home" })
})
app.get("/verify", (req, res) => {
    res.render('verify', { title: "home" })
})
app.get("/resend", (req, res) => {
    res.render('resend', { title: "home" })
})
app.get("/dashboard", (req, res) => {
    res.render('dashboard', { title: "home" })
})
app.get("/home/:homeid", (req, res) => {
    res.render('homedetail', { title: "home" })
})
app.get("/addhome", (req, res) => {
    res.render('addhouses', { title: "home" })
})
app.use("/api", require("./backend/api/allapiroutes"))

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})