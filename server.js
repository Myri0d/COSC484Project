if(process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//import modeules
var express = require("express");
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var http = require("http");
var path = require("path");
var passport = require("passport");
var flash = require("express-flash");
var session = require("express-session");
//var initPassport = require("./passport-config");
//var User = require("../BackEnd/users");
var methodOverride = require("method-override");
var app = require('express')();
//server set up
var server = require('http').Server(app);
server.listen(8080);

//libraries and files to use
app.use(express.urlencoded({extended: false}));
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use("/css",  express.static(path.join(__dirname, 'css')));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));


//temp users array; for local signins without server will resert everytime server is restarted
const users = [];

//var newuser = new User();
//temp users array; for local signins without server will resert everytime server is restarted


//DB connection
mongoose.connect("mongodb://localhost:27017/", {useNewUrlParser: true});
//mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
var db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Mongoose!"));


//set up routes
app.get("/", function(req, res)
{
  res.sendFile(__dirname + "/index.html");
});

app.get("/index.html",  function(req, res)
{
  res.sendFile(__dirname + "/index.html");
});

app.get("/about.html", function(req, res)
{
  res.sendFile(__dirname + "/about.html");
});

app.get("/login.html", checkNotAuth, function(req, res)
{
  res.sendFile(__dirname + "/login.html");
});

app.post("/login.html", checkNotAuth,  passport.authenticate("local", {
  successRedirect: "/index.html",
  failureRedirect: "/login.html",
  failureFlash: true
}));


app.get("/signup.html", checkNotAuth, function(req, res)
{
  res.sendFile(__dirname + "/signup.html");
});

app.post("/signup.html", checkNotAuth,  async (req, res) =>
{
  try{

    var hashPass = await bcrypt.hash(req.body.password, 10);

    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashPass
    })
    res.redirect("/login.html");
  }catch{
    res.redirect("/signup.html");
  }
  console.log(users);
});

app.get("/Maintenance_Page.html", checkAuth, function(req, res)
{
  res.sendFile(__dirname + "/Maintenance_Page.html");
});

app.get("/payment.html", checkAuth, function(req, res)
{
  res.sendFile(__dirname + "/payment.html");
});

app.get("/contact.html", checkAuth, function(req, res)
{
  res.sendFile(__dirname + "/contact.html");
});


//check if not registered; if not redirect to login
function checkAuth(req, res, next){
  if(req.isAuthenticated())
  {
    return next();
  }
  res.redirect("login.html");
}

//checks if registered; if so continue to page
function checkNotAuth(req, res, next){
  if(req.isAuthenticated())
  {
  return res.redirect("index.html");
  }
  next();
}

//user verification
//initPassport(
  //passport,
  //email =>  users.find(user => user.email === email),
  //id => users.find(user => user.id === id)
//);

//allow logout
app.delete("/logout", (req, res) =>{
  req.logOut();
  res.redirect("login.html");
}
);



