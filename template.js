"use strict"

const fs = require("fs");
const mustache = require("mustache");

fs.readFile("./data.json", (err, text) => {
  if (err) throw err;
  let parse = JSON.parse(text);

  fs.readFile("./template.html", (err, template) => {
    if (err) throw err
    let string = template.toString();

    let result = mustache.render(string, parse);

    fs.writeFile("build2.html", result, (err) => {
      if (err) throw err;
    });
  });
});

