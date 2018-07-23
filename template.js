"use strict";

const fs = require("fs");
const mustache = require("mustache");

let list = ["./data.json"];

function readFile() {
    return new Promise((resolve) => {
        list.map(file => {fs.readFile(file, (err, text) => {
            if (err) throw err;
          resolve(JSON.parse(text));
        })});
    })
}

function writeFile(data) {
    return new Promise(resolve => {
        fs.readFile("./template.html", (err, text) => {
            if (err) throw err;
            let template = text.toString();

            resolve(mustache.render(template, data));
        });
    });
}

async function saveFile() {
    let data = await readFile();
    let render = await writeFile(data);

    return fs.writeFile("./build5.html", render, (err) => {
        if (err) throw err;
    });
}

saveFile()
    .catch(err => console.log(err.message));
