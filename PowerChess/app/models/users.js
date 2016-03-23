var mongoose = require('mongoose'),
    schema = mongoose.schema,
    bcrypt = require('bcrypt-nodejs'),
    UserSchema = new Schema({
        name: String,
        username: {
            type: String, 
            required: true,
            index: { unique: true }
        }
    });

UserSchema.pre('save', function(){
    var user = this;
    
    if(!user.identified('password')){
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

UserSchema.methods.comparePasswords = function(password){
    var user = this;
    return bcrypt.compareSync(password, user.password);
}

modules.exports = mongoose.model('User', UserSchema);