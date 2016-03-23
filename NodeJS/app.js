/* Building a web server with pure NodeJS *
var http = require('http'),
    fs = require('fs'),
    html = "",
    title = "Hello World", // template text
    obj = {
        firstName: 'John',
        lastName: 'Doe'
    };

http.createServer(function(req, res){
    if(req.url === '/api'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(obj));
    }
    else if(req.url === "/"){
        res.writeHead(200, {'Content-Type': 'text/html'});
        html = fs.createReadStream(__dirname + '/index.html');
        
        html.on('data', function(data) {
          data = data.toString().replace('{title}', title);
          res.write(data);
        });
        
        html.on('end', function (data) {
            html.pipe(res);
        });
    }
    else {
        // Accessing a URL not handled or specified above
        res.writeHead(404);
        res.end();
    }
}).listen(1337, '127.0.0.1');
//*/

/* ExpressJS, Static files and Middleware and Template Engines *
'use strict'
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000; // a working express app

app.use('/public', express.static(__dirname + '/public'));

app.set("view engine", "ejs");

app.use("/", function(res, req, next){
    console.log("Request URL: " + req.url);
    next();
});

app.get('/', function(req, res){ // URL, callback function(express request, express response)
    res.send("<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><link rel='stylesheet' href='public/style.css'/><title>Learning NodeJS</title></head><body><h1>Hello World</h1></body></html>");
});

app.get('/person/:id', function(req, res){ // URL, callback function(express request, express response)
    //res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><link rel='stylesheet' href='public/style.css'/><title>Learning NodeJS</title></head><body><h1>Person: ${req.params.id}</h1></body></html>`);
    res.render('person', {ID: req.params.id});
});

app.get('/api', function(req, res){
    res.json({first: "John", last: "Doe"});
});

app.listen(port);
//*/

/* Querystring and Post parameters *
'use strict'
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000; // a working express app

app.use('/public', express.static(__dirname + '/public'));

app.set("view engine", "ejs");

app.use("/", function(res, req, next){
    console.log("Request URL: " + req.url);
    next();
});

app.get('/', function(req, res){
    res.render("index");
});

app.get('/person/:id', function(req, res){
    res.render('person', {ID: req.params.id});
});

app.get('/api', function(req, res){
    res.json({first: "John", last: "Doe"});
});

app.listen(port);
//*/

/* Testing SQL connection */
'use strict'
var mysql      = require('mysql'),
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'awg3',
        password: ')pE5z5t:9X9hd\Jk',
        database : 'Localhost'
    });
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err){
    throw err;
  }
 
  console.log('The solution is: ', rows[0].solution);
});
 
connection.end();
//*/