'use strict'
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