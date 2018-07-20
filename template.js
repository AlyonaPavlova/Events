"use strict";

const fs = require("fs");
const mustache = require("mustache");
const async = require("async");

let list = ["./data.json"];

new Promise((resolve) => {
  let resultData = {};

  async.forEachOf(list, (key) => {fs.readFile(key, (err, text) => {
    if (err) throw err;

    let parse = JSON.parse(text);
    resultData[key] = parse;

    resolve(parse);
  })})
})
  .then(parse => {
    return new Promise(resolve => {
      fs.readFile("./template.html", (err, text) => {
        if (err) throw err;
        let template = text.toString();

        resolve(mustache.render(template, parse));
      });
    });
  })
  .then(rand => {
    fs.writeFile("./build4.html", rand, (err) => {
      if (err) throw err;
    });
  })
  .catch(error => {
    console.log("Error!");
  })
