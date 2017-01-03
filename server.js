var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var Click = require('./models/click');

var app = express();

var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));

app.use(express.static("./public"));

//---------------------

mongoose.connect('mongodb://localhost/reacttest');

var db = mongoose.connection;

db.on("error", function(err){
    console.log("Mongoose connection error", err);
});

db.once("open", function(){
    console.log("Mongoose connection Successful, check port 3000");
});

//---------------------

// app.get("/", function(req, res){
//     res.sendFile(__dirname + "/public/index.html");
// })


app.get("/api", function(req, res){

    Click.find({}).sort([
        ["userCreated", "descending"]
    ]).limit(6).exec(function(err, doc){
        if (err){
            console.log(err)
        }else{
            res.send(doc);
        }
    });
});

app.post("/api", function(req, res){
    
    console.log("server ln 56", req.body);

    Click.create({
        
        search: req.body.search,
        userCreated: Date.now()

    }, function(err) {
         if (err){
            console.log(err);
        }else {
            res.send("Latest Search Saved");
        }
    })
});


//-----------------------------------------


app.listen(PORT, function(){
    console.log("App listening on PORT" + PORT);
})