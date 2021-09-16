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

const Razorpay=require("razorpay");

const razorpay=new Razorpay({
    key_id:process.env.key_id,
    key_secret:process.env.key_secret
});
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
app.post("/order",(req,res)=>
{
    var options = {
        amount: 100,  
        currency: "INR"
      };
      razorpay.orders.create(options, function(err, order) {
        console.log(order,err);
        res.json(order);
      });
});
app.post("/is-order-complete",(req, res)=>
{
    razorpay.payments.fetch(req.body.razorpay_payment_id).then((doc)=> {
        if(doc.status=="captured"){
            res.send("Payment Successful!!")
        }
        else
        res.redirect("/");
    })
});

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
app.get("/verifyadmin", (req, res) => {
    res.render('verifyadmin', { title: "home" })
})
app.get("/resend", (req, res) => {
    res.render('resend', { title: "home" })
})
app.get("/resendadmin", (req, res) => {
    res.render('resendadmin', { title: "home" })
})
app.get("/dashboard", (req, res) => {
    res.render('dashboard', { title: "home" })
})
app.get("/admin/dashboard", (req, res) => {
    res.render('admindashboard', { title: "home" })
})
app.get("/home/:homeid", (req, res) => {
    res.render('homedetail', { title: "home" })
})
app.get("/adminhome/:homeid", (req, res) => {
    res.render('adminhomedetails', { title: "home" })
})
app.get("/addhome", (req, res) => {
    res.render('addhouses', { title: "home" })
})
app.get("/updatehome/:id", (req, res) => {
    res.render('updatehome', { title: "home" })
})
app.get("/wishlist", (req, res) => {
    res.render('wishlist', { title: "home" })
})
app.get("/updateprofile/", (req, res) => {
    res.render('updateprofile', { title: "home" })
})
app.get("/admin/updateprofile/", (req, res) => {
    res.render('updateadminprofile', { title: "home" })
})
app.get("/signup/organiser", (req, res) => {
    res.render('organisersignup', { title: "home" })
})
app.get("/login/organiser", (req, res) => {
    res.render('adminlogin', { title: "home" })
})
app.get("/joinedhouses",(req, res) => {
    res.render("joinedhouses",{ title: "home" })
})
app.get("/acceptedhouses", (req, res) => {
    res.render('acceptedhouses', { title: "home" })
})
app.use("/api", require("./backend/api/allapiroutes"))

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})