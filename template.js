"use strict";

const mustache = require("mustache");
const fsPromises = require('fs').promises;

let list = ["./data.json"];

async function saveFile() {
  let template = await fsPromises.readFile("./template.html", "utf8");
  let dataList = await Promise.all(list.map(path => fsPromises.readFile(path, "utf8")));
  let data = dataList.reduce(previousValue => {return previousValue;});

  await fsPromises.writeFile("./build6.html", mustache.to_html(template, data));
}

saveFile()
    .catch(err => console.log(err.message));

