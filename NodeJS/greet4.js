function Greet(){
    this.greeting = "Hello world 4";
    this.greet = function(){
        console.log(this.greeting);
    }
}

module.exports = Greet; // <-- allows you to use this file as a constructor function