var express =    require('express'),
    bodyParser = require('body-parser'),
    morgan =     require('morgan'),
    config =     require('./config'),
    mongoose =   require('mongoose'),
    app = express();

mongoose.connect(config.database, function(err){
    if(err){
        console.log(err);
    }
    else {
        console.log('Connected to the database');
    }
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('*', function(req, res){
    res.sendFile(__dirname + "/public/views/index.html");
});

app.listen(config.port, function(err){
    if(err){
        console.log(err);
    }
    else {
        console.log("Listening on port + " + config.port);
    }
});