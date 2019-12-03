var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:3000/";


MongoClient.connect(url, function(err,db){
    if (err) throw err;
    var dbProject = db.db("projectDB");
    var priority = document.getElementById("pr");
    var category = document.getElementById("cat");
    var location = document.getElementById("loc");
    var full_descript = document.getElementById("textArea1");
    var access = document.getElementById("textArea2");

    dbProject.createCollection("maintenence");
    dbProject.collection("maintenence").insert(dbProject, function(err,res){
        if(err) throw err;
    dbProject.collection("maintenence").insert(priority, function(err,res){
        if(err) throw err;
    dbProject.collection("maintenence").insert(category, function(err,res){
        if(err) throw err;
    dbProject.collection("maintenence").insert(location, function(err,res){
        if(err) throw err;
    dbProject.collection("maintenence").insert(full_descript, function(err,res){
        if(err) throw err;
    dbProject.collection("maintenence").insert(access, function(err,res){
        if(err) throw err;
});
});
});
});
});
});