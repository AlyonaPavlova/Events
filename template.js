"use strict";

const fs = require("fs");
const async = require("async");
const mustache = require("mustache");

let list = ["./data.json"];

function readFile() {
    return new Promise((resolve) => {
        let resultData = {};

        async.forEachOf(list, (key) => {fs.readFile(key, (err, text) => {
            if (err) throw err;

            let parse = JSON.parse(text);
            resultData[key] = parse;

            resolve(parse);
        })})
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
