"use strict";

const fs = require("fs");
const async = require("async");
const promise = require("promise");
const mustache = require("mustache");

let list = ["./data.json"];

function getData() {
  let resultData = {};

  async.forEachOf(list, (key) => {
    fs.readFile(key, (err, text) => {
      if (err) throw err;
      return resultData[key] = JSON.parse(text);
    });
  });
}

function getTemplate() {
  fs.readFile("./template.html", (err, text) => {
    if (err) throw err;
    return text.toString();
  });
}

async function getFile() {

  let results = await Promise.all([getData,getTemplate]);

  let render = mustache.render(results);

  return fs.writeFile("./build5.html", render, (err) => {
    if (err) throw err;
  });
}

getFile()
  .catch(err => console.err(err.message));


// async function getFile() {
//   let resultData = {};
//
//   const data = async.forEachOf(list, (key) => {
//     fs.readFile(key, (err, text) => {
//       if (err) throw err;
//       return resultData[key] = JSON.parse(text);
//     });
//   });
//   const render = await fs.readFile("./template.html", (err, text) => {
//     if (err) throw err;
//     let template = text.toString();
//
//     console.log(data);
//
//     return mustache.render(template, data);
//   });
//
//   return fs.writeFile("./build5.html", render, (err) => {
//     if (err) throw err;
//   });
// }