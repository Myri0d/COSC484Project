if(process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//import modeules
var express = require("express");
var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
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
app.use('/images', express.static(path.join(__dirname,'images')))
app.use("/css",  express.static(path.join(__dirname,'css')));
app.use(flash());
app.use(session({
  secret: "bigolsecret",
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
//mongoose.connect("mongodb://localhost:27017/", {useNewUrlParser: true});
//mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
//var db = mongoose.connection;
//db.on("error", error => console.error(error));
//db.once("open", () => console.log("Connected to Mongoose!"));
const uri = encodeURI("mongodb+srv://kland:cosc484@cluster0-zjw4j.mongodb.net/test?retryWrites=true&w=majority");
const DATABASE_NAME = "projectdb";





//set up routes
function redirectAbout(){
  app.get('*', function(req, res) {
    const about = path.join(__dirname, 'about.html');
    res.redirect(about);
});
}

app.get('*', function(req, res)
{
  const index = path.join(__dirname, 'index.html');
  res.sendFile(index);
});
var port = process.env.PORT || 3000;

app.get('*', function(req, res)
{
  const about = path.join(__dirname, 'about.html');
  res.sendFile(about);
});

app.get('*', function(req, res)
{
  const login = path.join(__dirname,'login.html');
  res.sendFile(login);
});



app.post("login.html", checkNotAuth,  passport.authenticate("local", {
  successRedirect: "/index.html",
  failureRedirect: "/login.html",
  failureFlash: true
}));


app.get('*', function(req, res)
{
  const signup = path.join(__dirname,'signup.html');
  res.sendFile(signup);
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

app.get('login.html', function(req, res)
{
  const maint = path.join(__dirname, 'Maintenance_Page.html');
  res.sendFile(maint);
});

app.get('*', function(req, res)
{
  const payment = path.join(__dirname, 'payment.html');
  res.sendFile(payment);
});

app.get('*', function(req, res)
{
  const contact = path.join(__dirname, 'contact.html');
  res.sendFile(contact);
});

app.listen(port, () => {
  const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect((error, client) => {
        if(error) {
            throw error;
        }

            database = client.db(DATABASE_NAME);
            database.createCollection("users");
            console.log("inside databse");
  });
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
