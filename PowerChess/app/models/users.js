var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    UserSchema = new Schema({
        name: String,
        username: {
            type: String, 
            required: true,
            index: { unique: true }
        },
        password: {
            type: String,
            required: true,
            select: false
        }
    });

UserSchema.pre('save', function(next){
    var user = this;
    
    if(!user.isModified('password')){
        return next();
    }
    
    bcrypt.hash(user.password, null, null, function(err, hash){
        if(err){
            return next(err);
        }
        
        user.password = hash;
        next();
    });
});

// Compares two passwords: one typed in on the front end vs one in the database
UserSchema.methods.comparePasswords = function(password){
    var user = this;
    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', UserSchema);