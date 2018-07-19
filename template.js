"use strict"

const fs = require("fs");
const mustache = require("mustache");

const myPromise = new Promise((resolve, reject) => {
  fs.readFile("./data.json", (err, text) => {
    if (err) throw err;
    let parse = JSON.parse(text);

    fs.readFile("./template.html", (err, template) => {
      if (err) throw err
      let temp = template.toString();

      resolve(temp, parse);
    });
  });

})

myPromise
  .then(temp => {

  })
  .then(temp, parse => {
    let result = mustache.render(temp, parse);
    return result;
    })
  .then(result => {
    fs.writeFile("build3.html", result, (err) => {
      if (err) throw err;
    });
  })
  .catch(error => {
    console.log(error);
  });
