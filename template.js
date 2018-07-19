"use strict"

const fs = require("fs");
const mustache = require("mustache");
const async = require("async");

let list = ["./data.json"];

function callback() {
  let resultData = [];

  list.forEach(key => {
    fs.readFile(key, (err, text) => {
      if (err) throw err;

      let parse = JSON.parse(text);
      resultData.push(parse);
      console.log(parse);


      callback(err, parse);
    });
  });
}

Promise.all(list.map(callback))
  .then(parse => {
    fs.readFile("./template.html", (err, text) => {
      if (err) throw err;
      const template = text.toString();

      const html = mustache.render(template, parse);

      fs.writeFile("./build3.html", html, (err) => {
        if (err) throw err;
      });
    });
  });

