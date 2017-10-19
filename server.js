const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const path = require("path");
const mysql = require("mysql");

// Init express app
var app = express();

// MySQL Connection String
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "AWTCC"
});

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting view engine
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

// Setting static folder
app.use('/', express.static(path.join(__dirname, 'public')));

// Error handing
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    // res.render('error', {
    //     err : err.stack
    // });
});

// Creating Database
app.get('/createDB', function(req,res){
     con.connect(function(err) {
         if (err) {
            //  res.send("Some error in database creation");
            res.render("error", {
                msg : "Error: Some error in database creation"
            });
         } else {
             con.query("CREATE DATABASE AWTCC", function(err,result) {
                if(err) {
                    // res.send("Database not created");
                    res.render("error", {
                        msg: "Error: Database not created"
                    });
                    console.log("Database not created");
                } else {
                    res.send("Database created");
                    console.log("Database created");                    
                }
             });
         }
     });
});


app.get('/formUser', function(req,res){
    var sql = "CREATE TABLE users (name VARCHAR(255), password VARCHAR(255), email VARCHAR(255))";
    con.query(sql, function(err,result) {
        if(err) {
            console.log("Error in Creation of the table");
            res.render("error",{
                msg : "Error: In creating User table"
            });
        } else {
            console.log("User table created");   
            res.send("User table created");   
        }
    });
});

// Adding users
app.post('/addUser', function(req,res){
    con.query("INSERT INTO `users`(`name`,`password`,`email`) VALUES ('"+req.body.name+"','"+req.body.pass+"','"+req.body.email+"')",  function(err, result) {
        if(err) {
            console.log("Data Not Inserted");
            res.render("error", {
                msg : "Data Not Inserted"
            });
        } else {
            console.log("Data Inserted");
            res.send("Data Inserted");
        }
    });       
});


// Display users
app.get('/showUserAPI', function(req, res) {
    var sql="SELECT * FROM users";
    con.query(sql, function(err, result) {
        if(err) {
            console.log("Error in displaying data");
            res.render("error", {
                msg : "Error in fetching the data"
            });
        } else {
            res.json(result);
        }
    });
});

// index route
app.get('/', function(req,res) {
    res.render("index");
});

app.listen(4000, function(){
    console.log("Server Started in port 4000");
});