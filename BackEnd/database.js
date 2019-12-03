var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/";
var url = process.env.MONGOLAB_URI;

MongoClient.connect(url, function(err,db){
    if (err) throw err;
  
    db.createCollection("users");
    db.createCollection("amenities");
    db.createCollection("Pay");
    db.createCollection("maintenence");
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
        
        
        if (err){
            alert("Unable to process payment");
            return false;
        }
        db.collection("users").insert(paymentInfo, function(err,res){
            if (err) throw err;
            alert("inserted");
        });
    });
    alert("Your Payment has been processed");
    return true;
}

