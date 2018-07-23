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
    fs.writeFile(file, render, (err) => {
      if (err) throw err;
      resolve();
    });
  });
}

function render(data, template) {
  return new Promise(resolve => {
    resolve(mustache.render(data, template));
  })
}

async function saveFile() {
  let template = await readFile("./template.html");
  let dataList = await Promise.all(list.map(path => readFile(path)));
  let data = dataList.reduce(previousValue => {
    return previousValue;
  });

  let render = await render(data, template);

  return writeFile("./build6.html", render);
}

saveFile()
    .catch(err => console.log(err.message));

