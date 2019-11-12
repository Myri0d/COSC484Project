var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:3000/";

MongoClient.connect(url, function(err,db){
    if (err) throw err;
    var dbProject = db.db("projectDB");
    dbProject.createCollection("users");
    dbProject.createCollection("amenities");
    dbProject.createCollection("Pay");
    dbProject.createCollection("maintenence");
});