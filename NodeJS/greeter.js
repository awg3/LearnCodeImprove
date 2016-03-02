'use strict'

var EventEmitter = require("events");

module.exports = class Greeter extends EventEmitter{
    constructor() {
        super();
        this.greeting = "Well, hello";
    }
    greet(data){
        console.log(`${this.greeting}: ${data}!`);
        this.emit("greet", data); // giving greet and data to any object which inherits from Greeter
    }
}