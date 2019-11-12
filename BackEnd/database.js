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

function storePayment(){
    var fname = document.getElementById('fname');
    var lname = document.getElementById('lname');
    var street = document.getElementById('stname');
    var apt = document.getElementById('aptname');
    var city = document.getElementById('city');
    var state = document.getElementById('state');
    var cardName = document.getElementById('Card');
    var cardNum = document.getElementById('cNumb');
    var expDate = document.getElementById('eDate');
    var cvv = document.getElementById('cvv');

    var paymentInfo = {
        Firstname: fname,
        LastName: lname,
        Street: street,
        ApartmentNum: apt,
        City: city,
        State: state,
        CardName: cardName,
        CardNum: cardNum,
        ExpDate: expDate,
        CVV: cvv
    }
    MongoClient.connect(url, function(err,db){
        if (err) throw err;
        dbTest.collection("customers").insert(paymentInfo, function(err,res){
            if (err) throw err;
            
            
        });
    });
    alert("Your Payment has been processed");
    return true;
}
