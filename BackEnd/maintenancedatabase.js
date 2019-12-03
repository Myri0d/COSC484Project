var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:3000/";

MongoClient.connect(url, function(err,db){
    if (err) throw err;
    var dbProject = db.db("projectDB");
    dbProject.createCollection("priority");
    dbProject.collection("priority").insert(dbProject, function(err,res){
        if(err) throw err;
    });
    dbProject.createCollection("category");
    dbProject.collection("category").insert(dbProject, function(err,res){
        if(err) throw err;
    });
    dbProject.createCollection("location");
    dbProject.collection("location").insert(dbProject, function(err,res){
        if(err) throw err;
    });
    dbProject.createCollection("full_description");
    dbProject.collection("full_description").insert(dbProject, function(err,res){
        if(err) throw err;
    });
    dbProject.createCollection("access_instructions");
    dbProject.collection("access_instructions").insert(dbProject, function(err,res){
        if(err) throw err;
    });

});