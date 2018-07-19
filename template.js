"use strict"

const fs = require("fs");
const mustache = require("mustache");
const async = require("async");

let list = ["./data.json"];

function getData (list, callback) {
  let resultData = {};

  async.each(list, (key, callbackAsync) => {
    fs.readFile(key, (err, text) => {
      if (err) throw err;

      let parse = JSON.parse(text);
      resultData[key] = parse;

      callbackAsync(err);
      callback(err, parse);
    });
  });
}

getData(list, (error, data) => {
  fs.readFile("./template.html", (err, text) => {
    if (err) throw err;
    const template = text.toString();

    const html = mustache.render(template, data);

    fs.writeFile("./build3.html", html, (err) => {
      if (err) throw err;
    });
  });
})

