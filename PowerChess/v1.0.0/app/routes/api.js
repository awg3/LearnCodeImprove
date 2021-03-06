var User = require("../models/users"),
    Story = require("../models/story"),
    config = require("../../config"),
    secretKey = config.secretKey,
    jsonwebtoken = require("jsonwebtoken");

function createToken(user){
    var token = jsonwebtoken.sign({
        id: user._id,
        name: user.name,
        username: user.username
    }, secretKey, {
        expiresInMinute: 1440
    });
    
    return token;
}

module.exports = function(app, express, io){
    var api = express.Router();
    
    api.get('/allstories', function(req, res){
        Story.find({}, function(err, stories){
            if(err){
                res.send(err);
                return;
            }
            res.json(stories);
        });
    });
    
    api.post('/signup', function(req, res){
        var user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });
        
        var token = createToken(user);
        
        user.save(function(err){
            if(err){
                res.send(err);
                return;
            }
            res.json({
                success: true,
                message: 'User has been created!',
                token: token
            });
        });
    });
    
    api.get('/users', function(req, res){
        User.find({}, function(err, users){
            if(err){
                res.send(err);
                return;
            }
            res.json(users);
        });
    });
    
    api.post('/login', function(req, res){
        User.findOne({
            username: req.body.username
        }).select('name username password').exec(function(err, user){
            if(err){
                throw err;
            }
            if(!user){
                res.send({message: "User does not exist"});
            }
            else if(user){
                var validPassword = user.comparePassword(req.body.password);
                
                if(!validPassword){
                    res.send({
                        message: "Invalid Password"
                    });
                }
                else {
                    // Token
                    var token = createToken(user);
                    
                    res.json({
                        success: true,
                        message: "Login successful!",
                        token: token
                    });
                }
            }
        });
    });
    
    // Middleware
    api.use(function(req, res, next){
        console.log("Somebody just came to our app!");
        
        var token = req.body.token || req.params.token || req.headers['x-access-token'];
        
        // check if does not exist
        if(token){
            jsonwebtoken.verify(token, secretKey, function(err, decoded){
                if(err){
                    res.status(403).send({
                        success: false,
                        message: "Failed to authenticate user"
                    });
                }
                else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else {
            res.status(403).send({
                success: false,
                message: 'No token provided'
            });
        }
    });
    
    // Destination B, via legitimate token
    api.route('/')
        .post(function(req, res){
            var story = new Story({
                creator: req.decoded.id,
                content: req.body.content
            });
            
            story.save(function(err, newStory){
                if(err){
                    res.send(err);
                    return;
                }
                
                // Rendering a new story in real time
                io.emit('story', newStory);
                
                res.json({message: "New Story Created!"});
            })
        })
        .get(function(req, res){
            Story.find({
                creator: req.decoded.id
            }, function(err, stories){
                if(err){
                    res.send(err);
                    return;
                }
                res.send(stories);
            });
        });
    
    api.get('/me', function(req, res){
        res.send(req.decoded);
    });
    
    return api;
}