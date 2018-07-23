"use strict";

const fs = require("fs");
const mustache = require("mustache");

let list = ["./data.json"];

function readFile(path) {
  return new Promise(resolve => {
    fs.readFile(path, (err, text) => {
      if (err) throw err;
      resolve(text.toString());
    });
  });
}

function writeFile(file, render) {
  return new Promise(resolve => {
    resolve(fs.writeFile(file, render, (err) => {
      if (err) throw err;
    }));
  });
}

async function saveFile() {
  let template = await readFile("./template.html");
  let dataList = await Promise.all(list.map(path => readFile(path)));
  let data = await dataList.reduce(previousValue => {
    return previousValue;
  });

  return writeFile("./build6.html", mustache.render(template, data));
}

saveFile()
    .catch(err => console.log(err.message));


// function getObj(array) {
//   return new Promise(resolve => {
//     resolve(array.reduce(previousValue => {
//       return previousValue;
//     }));
//   });
// }
//
// async function saveFile() {
//   let template = await readFile("./template.html");
//   let dataList = await Promise.all(list.map(path => readFile(path)));
//   let data = await getObj(dataList);
//
//   return writeFile("./build6.html", mustache.render(template, data));
// }
