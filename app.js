"use strict";

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const hello = new MyEmitter();
hello.on("hello", () => {
    console.log("Hello to you!");
});

hello.emit("hello");

const question1 = new MyEmitter();
question1.on("How are you?", () => {
    console.log("I'm fine! Thanks!");
});

question1.emit("How are you?");

const question2 = new MyEmitter();
question2.on("What are you doing?", () => {
    console.log("I'm working!");
});

question2.emit("What are you doing?");

module.exports = {hello, question1, question2};