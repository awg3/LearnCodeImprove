var mysql = require("mysql"),
    connection = mysql.createConnection({
        host: "176.32.230.42",
        user: "cl58-pwrchess",
        password: "4cdeq!943"
    }),
    queryString = "SELECT * FROM User";

connection.connect(function (err) {
    if (err) {
        console.log('Error connecting to the database: ' + err);
        return;
    }
    else {
        console.log('Connection established!');
    }
});

connection.query(queryString, function(err, rows, fields){
    if(err){
        throw err;
    }
    
    for(var i in rows){
        console.log('Post Titles', rows[i].post_title);
    }
});

connection.end(function (err) {
    // The connection is terminated gracefully
    // Ensures all previously enqueued queries are still
    // before sending a COM_QUIT packet to the MySQL server.
});