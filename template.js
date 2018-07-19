"use strict"

const fs = require("fs");
const mustache = require("mustache");
const async = require("async");

let data = ["./data.json"];
let dataParse = [];

async.each(data, (key, callback) => {
  fs.readFile(key, (err, text) => {
    if (err) throw err;
    let parse = JSON.parse(text);
    dataParse.push(parse);

    function callback() {

      fs.readFile("./template.html", (err, text) => {
        if (err) throw err;
        let template = text.toString();

        let result = mustache.render(template, parse);

        fs.writeFile("./build3.html", result, (err) => {
          if (err) throw err;
        });
      });
    }

    callback();
  });
});




