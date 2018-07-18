"use strict"

const fs = require("fs");
const mustache = require("mustache");

function promiseAdd () {
  return new Promise((resolve, reject) => {
    fs.readFile("./data.json", (err, text) => {
      if (err) throw err;
      let parse = JSON.parse(text);
      return parse;
    })
      .then(parse => {
        let result = mustache.render(string, parse);
        return result;
      })
      .then(result => {
        fs.writeFile(("build2.html", result, (err) => {
          if (err) throw err;
        })
      })
  })
}


