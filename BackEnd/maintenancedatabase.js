var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:3000/";

MongoClient.connect(url, function(err,db){
    if (err) throw err;
    var dbProject = db.db("projectDB");
    var priority = document.getElementById("pr");
    var category = document.getElementById("cat");
    var location = document.getElementById("loc");
    var full_descript = document.getElementById("textArea1");
    var location = document.getElementById("textArea2");
    dbProject.createCollection("priority");
    dbProject.collection("priority").insert(priority, function(err,res){
        if(err) throw err;
    });
    dbProject.createCollection("category");
    dbProject.collection("category").insert(category, function(err,res){
        if(err) throw err;
    });
    dbProject.createCollection("location");
    dbProject.collection("location").insert(location, function(err,res){
        if(err) throw err;
    });
    dbProject.createCollection("full_description");
    dbProject.collection("full_description").insert(full_descript, function(err,res){
        if(err) throw err;
    });
    dbProject.createCollection("access_instructions");
    dbProject.collection("access_instructions").insert(location, function(err,res){
        if(err) throw err;
    });

});