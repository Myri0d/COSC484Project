var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err,db){
    if (err) {throw err;}
    var dbProject = db.db("projectDB");
    var username = document.getElementById("userEmail");
    var passw = document.getElementById("userPass");

    dbProject.createCollection("users");
    dbProject.collection("users").insert(dbProject, function(err,res){
        if(err) throw err;
    dbProject.collection("users").insert(username, function(err,res){
        if(err) throw err;
    dbProject.collection("users").insert(passw, function(err,res){
        if(err) throw err;
        db.close();
    });
});
    })});
